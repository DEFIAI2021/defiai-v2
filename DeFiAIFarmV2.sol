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
        string upline;
    }

    struct PoolInfo {
        IERC20 want;
        uint256 minFee;
        address strat;
    }

    /* ========== CONSTANTS ============= */

    // Denominator for fee calculations.
    uint256 public constant FEE_DENOM = 10000;

    /* ========== STATE VARIABLES ========== */

    // Info of each pool.
    PoolInfo[] public  poolInfo;

    // Info of each user that stakes LP tokens.
    mapping(address => UserInfo) public  userInfo;
  
    // Fee paid for withdrawals
    uint256 public  withdrawalFee;

    // Developer address.
    address public devAddress;

    /* ========== MODIFIERS ========== */

    modifier validatePid(uint256 _pid) {
        require(
            _pid < poolInfo.length,
            "DeFiAIFarmV2::validatePid: Not exist"
        );
        _;
    }

    modifier onlyGovernance() {
        require(
            (msg.sender == devAddress || msg.sender == owner()),
            "DeFiAIFarmV2::onlyGovernance: Not gov"
        );
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address _devAddress,
        uint256 _withdrawalFee
    ) {
        devAddress = _devAddress;
        withdrawalFee = _withdrawalFee;
    }

    /* ========== VIEWS ========== */

    function poolLength() external view  returns (uint256) {
        return poolInfo.length;
    }

    function getTotalBalance(uint256 _pid, address _user) external view returns (uint256) {
        PoolInfo memory pool = poolInfo[_pid];
        return IDeFiAIMultiStrat(pool.strat).balances(_user);
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function deposit(uint256 _pid, uint256 _wantAmt, string memory _referral)
        external
        validatePid(_pid)
        nonReentrant
    {
        PoolInfo storage pool = poolInfo[_pid];
        UserInfo storage user = userInfo[msg.sender];
        if (bytes(user.upline).length == 0) {
            user.upline = _referral;
        }
        if (_wantAmt > 0) {
            pool.want.safeTransferFrom(
                address(msg.sender),
                address(this),
                _wantAmt
            );

            pool.want.safeIncreaseAllowance(pool.strat, _wantAmt);
            IDeFiAIMultiStrat(pool.strat).deposit(msg.sender, _wantAmt);
        }
        emit Deposit(msg.sender, _referral, _wantAmt, address(pool.want));
    }

    function withdraw(uint256 _pid, uint256 _wantAmt)
        public
        validatePid(_pid)
        nonReentrant
    {
        PoolInfo storage pool = poolInfo[_pid];
        if (_wantAmt > 0) {
            uint256 realAmt = IDeFiAIMultiStrat(pool.strat).withdraw(msg.sender, _wantAmt);

            _wantAmt = realAmt;
            uint256 fee = _wantAmt * withdrawalFee / FEE_DENOM;
            if (fee < pool.minFee) {
                fee = pool.minFee;
            }
            _wantAmt -= fee;
            pool.want.safeTransfer(pool.strat, fee);
            pool.want.safeTransfer(address(msg.sender), _wantAmt);
        }
        emit Withdraw(msg.sender, _wantAmt, address(pool.want));
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
        require(_strat != address(0), "DeFiAIFarmV2::add: Strat can not be zero address.");
        poolInfo.push(
            PoolInfo({
                want: _want,
                minFee: _minFee,
                strat: _strat
            })
        );
    }

    function setMinWithdrawalFee(
        uint256 _pid,
        uint256 _minFee
    )
        external
        onlyGovernance
        validatePid(_pid)
    {
        poolInfo[_pid].minFee = _minFee;
        emit UpdateMinWithdrawalFee(_pid, _minFee);
    }

    function setWithdrawalFee(uint256 _withdrawalFee)
        external
        onlyGovernance
    {
        require(_withdrawalFee < FEE_DENOM, "DeFiAIFarmV2::setWithdrawalFee: Fee > max");
        withdrawalFee = _withdrawalFee;
    }

    function setDevAddress(address _devAddress)
        external
        onlyGovernance
    {   
        require(_devAddress != address(0), "DeFiAIFarmV2::set: Zero address");
        devAddress = _devAddress;
    }
    
}
