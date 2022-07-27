// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDeFiAIStableStrat.sol";

contract DeFiAIFarmV2 is Ownable {
    using SafeERC20 for IERC20;

    /* ========== EVENTS ============= */

    event Deposit(address indexed user, uint256 amount, address wantAddress);
    event Withdraw(address indexed user, uint256 amount, address wantAddress);

    /* ========== STRUCTS ============= */

    struct PoolInfo {
        IERC20 want;
        address strat;
    }


    /* ========== STATE VARIABLES ========== */

    // Info of each pool.
    PoolInfo public poolInfo;

    // Developer address.
    address public immutable devAddress;

    // Init state
    bool public isInit;

    /* ========== MODIFIERS ========== */

    modifier onlyGovernance() {
        require(
            (msg.sender == devAddress || msg.sender == owner()),
            "DeFiAIFarmV2::onlyGovernance: Not gov"
        );
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor(address _devAddress) {
        require(
            _devAddress != address(0),
            "dev address cannot be the zero address"
        );
        devAddress = _devAddress;
    }

    /* ========== VIEWS ========== */

    function getPoolInfo() external view returns (address) {
        return poolInfo.strat;
    }

    function getTotalBalance(address _user) external view returns (uint256) {
        return IDeFiAIStableStrat (poolInfo.strat).balances(_user);
    }

    function getDevAddress() external view returns (address) {
        return devAddress;
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function deposit(uint256 _wantAmt) external {
        require(_wantAmt > 0, "amount is negative");
        require(
            poolInfo.want.allowance(msg.sender, address(this)) >= _wantAmt,
            "No allowances"
        );

        poolInfo.want.safeTransferFrom(
            address(msg.sender),
            address(this),
            _wantAmt
        );

        poolInfo.want.safeIncreaseAllowance(poolInfo.strat, _wantAmt);
        IDeFiAIStableStrat (poolInfo.strat).deposit(
            msg.sender,
            _wantAmt,
            address(poolInfo.want)
        );

        emit Deposit(msg.sender, _wantAmt, address(poolInfo.want));
    }

    function withdraw(uint256 _wantAmt, uint8 _pid) external {
        require(_wantAmt > 0, "amount is negative");

        _wantAmt = IDeFiAIStableStrat (poolInfo.strat).withdraw(
            _pid,
            msg.sender,
            _wantAmt,
            address(poolInfo.want)
        );

        poolInfo.want.safeTransfer(address(msg.sender), _wantAmt);
        emit Withdraw(msg.sender, _wantAmt, address(poolInfo.want));
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function initialize(IERC20 _want, address _strat) external onlyGovernance {
        require(!isInit, "DeFiAIFarmV2::setStrats: Already initialized");
        require(
            _strat != address(0),
            "DeFiAIFarmV2::setStrats: Strat can not be zero address."
        );
        poolInfo = PoolInfo({want: _want, strat: _strat});
        isInit = true;
    }
}
