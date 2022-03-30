// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./interfaces/IDeFiAIFarmV2.sol";
import "./interfaces/IDeFiAIMultiStrat.sol";

contract DeFiAIFarmV2 is IDeFiAIFarmV2, ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    struct UserInfo {
        uint256 shares;
        uint256 rewardDebt;
        uint256 lastDepositedTime;
    }

    struct PoolInfo {
        IERC20 want;
        uint256 minFee;
        address strat;
    }

    /* ========== CONSTANTS ============= */

    // Denominator for fee calculations.
    uint256 public constant FEE_DENOM = 10000;

    // Early withdrawal period. User withdrawals within this period will be charged an exit fee.
    uint256 public immutable  earlyExitPeriod;

    /* ========== STATE VARIABLES ========== */

    // Info of each pool.
    PoolInfo[] public  poolInfo;

    // Info of each user that stakes LP tokens.
    mapping(uint256 => mapping(address => UserInfo)) public  userInfo;
  
    // Fee paid for early withdrawals
    uint256 public  earlyExitFee;

    // Developer address.
    address public devAddress;

    /* ========== MODIFIERS ========== */

    modifier validatePid(uint256 _pid) {
        require(
            _pid < poolInfo.length,
            "MinoFarm::validatePid: Not exist"
        );
        _;
    }

    modifier onlyGovernance() {
        require(
            (msg.sender == devAddress || msg.sender == owner()),
            "MinoFarm::onlyGovernance: Not gov"
        );
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address _devAddress,
        uint256 _earlyExitFee,
        uint256 _earlyExitPeriod
    ) {
        devAddress = _devAddress;
        earlyExitFee = _earlyExitFee;
        earlyExitPeriod = _earlyExitPeriod;
    }

    /* ========== VIEWS ========== */

    function getMultiplier(uint256 _from, uint256 _to)
        public
        
        pure
        returns (uint256)
    {
        return _to - _from;
    }

    function poolLength() external view  returns (uint256) {
        return poolInfo.length;
    }

    function stakedWantTokens(uint256 _pid, address _user)
        external
        
        view
        returns (uint256)
    {
        return userInfo[_pid][_user].shares;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function deposit(uint256 _pid, uint256 _wantAmt)
        external
        
        validatePid(_pid)
        nonReentrant
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        if (_wantAmt > 0) {
            pool.want.safeTransferFrom(
                address(msg.sender),
                address(this),
                _wantAmt
            );

            pool.want.safeIncreaseAllowance(pool.strat, _wantAmt);
            uint256 sharesAdded = IDeFiAIMultiStrat(pool.strat).deposit(msg.sender, _wantAmt);
            user.shares = user.shares + sharesAdded;
            user.lastDepositedTime = block.timestamp;
        }
    }

    function withdraw(uint256 _pid, uint256 _wantAmt)
        public
        
        validatePid(_pid)
        nonReentrant
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[_pid][msg.sender];
        if (_wantAmt > 0) {
            uint256 realAmt = IDeFiAIMultiStrat(pool.strat).withdraw(msg.sender, _wantAmt);

            _wantAmt = realAmt;
            if (block.timestamp - user.lastDepositedTime < earlyExitPeriod) {
                uint256 fee = _wantAmt * earlyExitFee / FEE_DENOM;
                if (fee < pool.minFee) {
                    fee = pool.minFee;
                }
                _wantAmt -= fee;
                pool.want.safeTransfer(pool.strat, fee);
            }
            pool.want.safeTransfer(address(msg.sender), _wantAmt);
        }
    }

    /* ========== RESTRICTED FUNCTIONS ========== */
    
    function add(
        IERC20 _want,
        address _strat,
        uint256 _minFee
    )
        external
        onlyGovernance
    {
        require(_strat != address(0), "MinoFarm::add: Strat can not be zero address.");
        poolInfo.push(
            PoolInfo({
                want: _want,
                minFee: _minFee,
                strat: _strat
            })
        );
    }

    function set(
        uint256 _pid,
        uint256 _minFee
    )
        external
        onlyGovernance
        validatePid(_pid)
    {
        poolInfo[_pid].minFee = _minFee;
    }

    function setEarlyExitFee(uint256 _earlyExitFee)
        external
        
        onlyGovernance
    {
        earlyExitFee = _earlyExitFee;
    }

    function setDevAddress(address _devAddress)
        external
        
        onlyGovernance
    {   
        require(_devAddress != address(0), "MinoFarm::set: Zero address");
        devAddress = _devAddress;
    }
    
}
