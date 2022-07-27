// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDeFiAIStableStrat.sol";
import "../pcs/interfaces/IPancakeswapFarm.sol";
import "../acs/interfaces/IStableSwap.sol";

interface IUniswapV2Router01 {
    function factory() external pure returns (address);

    function WETH() external pure returns (address);

    function addLiquidity(
        address busd,
        address usdt,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        returns (
            uint256 amountA,
            uint256 amountB,
            uint256 liquidity
        );

    function addLiquidityETH(
        address token,
        uint256 amountTokenDesired,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    )
        external
        payable
        returns (
            uint256 amountToken,
            uint256 amountETH,
            uint256 liquidity
        );

    function removeLiquidity(
        address busd,
        address usdt,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETH(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline
    ) external returns (uint256 amountToken, uint256 amountETH);

    function removeLiquidityWithPermit(
        address busd,
        address usdt,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountA, uint256 amountB);

    function removeLiquidityETHWithPermit(
        address token,
        uint256 liquidity,
        uint256 amountTokenMin,
        uint256 amountETHMin,
        address to,
        uint256 deadline,
        bool approveMax,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external returns (uint256 amountToken, uint256 amountETH);

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapTokensForExactTokens(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactETHForTokens(
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function swapTokensForExactETH(
        uint256 amountOut,
        uint256 amountInMax,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapExactTokensForETH(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external returns (uint256[] memory amounts);

    function swapETHForExactTokens(
        uint256 amountOut,
        address[] calldata path,
        address to,
        uint256 deadline
    ) external payable returns (uint256[] memory amounts);

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) external pure returns (uint256 amountB);

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountOut);

    function getAmountIn(
        uint256 amountOut,
        uint256 reserveIn,
        uint256 reserveOut
    ) external pure returns (uint256 amountIn);

    function getAmountsOut(uint256 amountIn, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);

    function getAmountsIn(uint256 amountOut, address[] calldata path)
        external
        view
        returns (uint256[] memory amounts);
}

contract DeFiAIStableStrat is Ownable {
    using SafeERC20 for IERC20;

    /* ========== EVENTS ============= */

    event Init(
        address[] _pcsAddresses,
        uint256 _pcsPid,
        address[] _mdexAddresses,
        uint256 _mdxPid,
        address[] _bswAddresses,
        uint256 _bswPid
    );
    event SetDevAddress(address _devAddress);
    event ChangeActiveStrategy(uint8 _newPid);

    /* ========== STRUCTS ============= */

    struct FarmInfo {
        address farmAddress;
        address lpAddress;
        address earnedAddress;
        address routerAddress;
        uint256 pid;
        uint256 accumulatedTokenPerShare;
        uint256 totalShare;
    }

    struct User {
        uint256 balance;
        uint256 rewardDebt;
        uint256 lastDepositBlock;
    }

    /* ========== STATE VARIABLES ========== */

    // Address of the Stable Pool Router.
    address public immutable swapRouterAddress;

    // Address of BUSD.
    address public immutable busd;

    // Address of USDT.
    address public immutable usdt;

    // Developer address.
    address public devAddress;

    // DeFiAI Farm address.
    address public immutable defiaiFarmAddress;

    address public immutable stratAddress;

    uint8 public activePid;

    bool public isInit;

    FarmInfo[3] public farmInfo;

    mapping(address => int128) public swapPid;

    mapping(address => mapping(uint256 => User)) public userInfo;

    /* ========== MODIFIERS ========== */

    modifier onlyFarms() {
        require(
            msg.sender == defiaiFarmAddress,
            "DeFiAIMultiStrat::onlyFarms: Caller is not a farm"
        );
        _;
    }

    modifier onlyGovernance() {
        require(
            (msg.sender == devAddress || msg.sender == owner()),
            "DeFiAIMultiStrat::onlyGovernance: Not gov"
        );
        _;
    }

    /* ========== CONSTRUCTOR ========== */

    constructor(
        address _swapRouterAddress,
        address _busd,
        address _usdt,
        address _devAddress,
        address _defiaiFarmAddress,
        address _stratAddress,
        int128 busdPid,
        int128 usdtPid
    ) {
        require(
            _swapRouterAddress != address(0),
            "swapRouterAddress cannot be the zero address"
        );
        require(_busd != address(0), "busd address cannot be the zero address");
        require(_usdt != address(0), "usdt address cannot be the zero address");
        require(
            _devAddress != address(0),
            "dev address cannot be the zero address"
        );
        require(
            _defiaiFarmAddress != address(0),
            "defiaiFarmAddress cannot be the zero address"
        );
        require(
            _stratAddress != address(0),
            "stratAddress cannot be the zero address"
        );
        swapRouterAddress = _swapRouterAddress;
        busd = _busd;
        swapPid[_busd] = busdPid;
        usdt = _usdt;
        swapPid[_usdt] = usdtPid;
        devAddress = _devAddress;
        defiaiFarmAddress = _defiaiFarmAddress;
        stratAddress = _stratAddress;
    }

    function init(
        address[] calldata _pcsAddresses,
        uint256 _pcsPid,
        address[] calldata _mdexAddresses,
        uint256 _mdxPid,
        address[] calldata _bswAddresses,
        uint256 _bswPid
    ) external onlyGovernance {
        require(!isInit, "DeFiAIStableStrat::init: Already init");
        require(
            _pcsAddresses.length == _mdexAddresses.length &&
                _mdexAddresses.length == _bswAddresses.length &&
                _bswAddresses.length == 4,
            "DeFiAIStableStrat::init: pool length error"
        );
        farmInfo[0] = FarmInfo(
            _pcsAddresses[0],
            _pcsAddresses[1],
            _pcsAddresses[2],
            _pcsAddresses[3],
            _pcsPid,
            0,
            0
        );
        farmInfo[1] = FarmInfo(
            _mdexAddresses[0],
            _mdexAddresses[1],
            _mdexAddresses[2],
            _mdexAddresses[3],
            _mdxPid,
            0,
            0
        );
        farmInfo[2] = FarmInfo(
            _bswAddresses[0],
            _bswAddresses[1],
            _bswAddresses[2],
            _bswAddresses[3],
            _bswPid,
            0,
            0
        );
        isInit = true;

        emit Init(
            _pcsAddresses,
            _pcsPid,
            _mdexAddresses,
            _mdxPid,
            _bswAddresses,
            _bswPid
        );
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    /** Deposits the amount from the user into an active pool and withdrawing any rewards the user
        had previously earned from the pool.
     */
    function deposit(
        address user, // the address of the user
        uint256 _wantAmt, // the amount from the user
        address _wantAddress //the address of the token deposited from the user, e.g BUSD
    ) external virtual onlyFarms returns (uint256) {
        require(_wantAmt > 0, "DeFiAIMultiStrat::: Zero deposit_wantAmt");
        IERC20(_wantAddress).safeTransferFrom(
            address(msg.sender),
            address(this),
            _wantAmt
        );

        _convertWantToLp(_wantAddress, _wantAddress == busd ? usdt : busd);
        uint256 _earnedBeforeFarm = IERC20(farmInfo[activePid].earnedAddress)
            .balanceOf(address(this));
        uint256 poolShare = farmInfo[activePid].totalShare;
        _farm(); //deposits the amount into the active pool
        if (poolShare > 0) {
            //condition check to prevent division by zero
            uint256 earn = _collect(_earnedBeforeFarm, activePid); //the amount of reward that all users earns from harvest
            farmInfo[activePid].accumulatedTokenPerShare +=
                (earn * 1e12) /
                poolShare; //updating the accumulatedTokenPerShare for the pool

            if (userInfo[user][activePid].balance > 0) {
                //distributes rewards to the user if they have existing balance
                uint256 promise_reward = ((farmInfo[activePid]
                    .accumulatedTokenPerShare *
                    userInfo[user][activePid].balance) / 1e12) -
                    userInfo[user][activePid].rewardDebt;

                if (promise_reward > 0) {
                    //transfer reward to the user if it is greater than 0
                    IERC20(farmInfo[activePid].earnedAddress).safeTransfer(
                        user,
                        promise_reward
                    );
                }
            }
        }
        if (_wantAmt > 0) {
            //updates balance and totalshare if deposited amount > 0
            userInfo[user][activePid].balance += _wantAmt;
            farmInfo[activePid].totalShare += _wantAmt;
        }

        userInfo[user][activePid].rewardDebt = ((farmInfo[activePid]
            .accumulatedTokenPerShare * userInfo[user][activePid].balance) /
            1e12); //updates the reward debt of the user

        userInfo[user][activePid].lastDepositBlock = block.number; //record the block number of the deposit (not for calculation)

        return _wantAmt;
    }

    /** Withdraws the amount for the user, from a specified pool, and harvests the reward for the user.
     */
    function withdraw(
        uint8 _pid, //the pool id to be withdrawn from
        address user, // the address of the user
        uint256 _wantAmt, // the amount to be withdrawn
        address _wantAddress //the address of the amount to be withdrawn
    ) external virtual onlyFarms returns (uint256) {
        require(
            block.number > userInfo[user][_pid].lastDepositBlock + 1,
            "DeFiAIMultiStrat::withdraw: cannot deposit and withdraw in same block"
        ); // checks the last deposit block number. the user cannot withdraw directly after they deposit
        require(_wantAmt > 0, "DeFiAIMultiStrat::withdraw: Zero _wantAmt");
        require(
            _wantAmt <= userInfo[user][_pid].balance,
            "DeFiAIMultiStrat::withdraw: No Enough balance"
        );
        uint256 _earnedBeforeFarm = IERC20(farmInfo[_pid].earnedAddress)
            .balanceOf(address(this)); //the amount users would have earned before this withdrawal
        _unfarm(_wantAmt, _pid);
        _convertLpToWant(
            _wantAddress,
            _wantAddress == busd ? usdt : busd,
            _pid
        );
        uint256 wantBalance = IERC20(_wantAddress).balanceOf(address(this)); //the balance of the address
        _wantAmt = _wantAmt > wantBalance ? wantBalance : _wantAmt; //prepare to transfer the remainder in the address, in the event that the withdrawal amount is slightly more than the remainder
        IERC20(_wantAddress).safeTransfer(defiaiFarmAddress, _wantAmt);
        uint256 earn = _collect(_earnedBeforeFarm, _pid); //the amount of reward that all users earns from harvest
        farmInfo[_pid].accumulatedTokenPerShare +=
            (earn * 1e12) /
            farmInfo[_pid].totalShare; //updating the accumulatedTokenPerShare for the pool

        if (userInfo[user][_pid].balance > 0) {
            //distributes rewards to the user if they have existing balance
            uint256 promise_reward = ((farmInfo[_pid]
                .accumulatedTokenPerShare * userInfo[user][_pid].balance) /
                1e12) - userInfo[user][_pid].rewardDebt;

            if (promise_reward > 0) {
                //transfer reward to the user if it is greater than 0
                IERC20(farmInfo[_pid].earnedAddress).safeTransfer(
                    user,
                    promise_reward
                );
            }
        }
        if (_wantAmt > 0) {
            //updates balance and totalshare if deposited amount > 0
            userInfo[user][_pid].balance -= _wantAmt;
            farmInfo[_pid].totalShare -= _wantAmt;
        }

        userInfo[user][_pid].rewardDebt = ((farmInfo[_pid]
            .accumulatedTokenPerShare * userInfo[user][_pid].balance) /
            1e12); //updates the reward debt of the user

        return _wantAmt;
    }

    function emergencyWithdraw(address _wantAddress, address _pairAddress)
        external
        onlyGovernance
    {
        //to withdraw the residue after transaction
        uint256 _leftoverToken = IERC20(_wantAddress).balanceOf(address(this));
        uint256 _leftoverPair = IERC20(_pairAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeTransfer(devAddress, _leftoverToken);
        IERC20(_pairAddress).safeTransfer(devAddress, _leftoverPair);
    }

    function changeActiveStrategy(uint8 _newPid) external onlyGovernance {
        require(_newPid != activePid, "newPid is the same as activePid");
        require(_newPid < 3, "uinitialized pid");
        activePid = _newPid;
        emit ChangeActiveStrategy(_newPid);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function setDevAddress(address _devAddress)
        external
        virtual
        onlyGovernance
    {
        require(
            _devAddress != address(0),
            "DeFiAIMultiStrat::set: Zero address"
        );
        devAddress = _devAddress;
        emit SetDevAddress(_devAddress);
    }

    /* ========== PRIVATE FUNCTIONS ========== */

    function _farm() internal virtual {
        uint256 _lp = IERC20(farmInfo[activePid].lpAddress).balanceOf(
            address(this)
        );
        IERC20(farmInfo[activePid].lpAddress).safeIncreaseAllowance(
            farmInfo[activePid].farmAddress,
            _lp
        );
        IPancakeswapFarm(farmInfo[activePid].farmAddress).deposit(
            farmInfo[activePid].pid,
            _lp
        );
    }

    function _unfarm(uint256 _wantAmt, uint8 _pid) internal virtual {
        uint256 _lp = _wantAmt / 2;

        FarmInfo memory activeFarm = farmInfo[_pid];
        address farmAddress = activeFarm.farmAddress;
        uint256 pid = activeFarm.pid;
        (uint256 _shares, ) = IPancakeswapFarm(farmAddress).userInfo(
            pid,
            address(this)
        );
        if (_lp > _shares) {
            _lp = _shares;
        }
        IPancakeswapFarm(farmAddress).withdraw(pid, _lp);
    }

    function _collect(uint256 _earnBeforeFarm, uint8 _pid)
        internal
        virtual
        returns (uint256)
    {
        FarmInfo memory activeFarm = farmInfo[_pid];
        uint256 _earned = IERC20(activeFarm.earnedAddress).balanceOf(
            address(this)
        );
        uint256 _newEarn = _earned - _earnBeforeFarm;
        uint256 _devEarn = (_newEarn * 30) / 100;
        _newEarn -= _devEarn;
        IERC20(activeFarm.earnedAddress).safeTransfer(devAddress, _devEarn);

        return _newEarn;
    }

    function _convertWantToLp(address _wantAddress, address _pairAddress)
        internal
    {
        uint256 wantAmt = IERC20(_wantAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeIncreaseAllowance(
            swapRouterAddress,
            wantAmt / 2
        );
        _safeStableSwap(
            swapPid[_wantAddress],
            swapPid[_pairAddress],
            wantAmt / 2
        );
        address routerAddress = farmInfo[activePid].routerAddress;
        uint256 _want = IERC20(_wantAddress).balanceOf(address(this));
        uint256 _pair = IERC20(_pairAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeIncreaseAllowance(routerAddress, _want);
        IERC20(_pairAddress).safeIncreaseAllowance(routerAddress, _pair);
        (
            uint256 _amountToken,
            uint256 _amountETH,
            uint256 _liquidity
        ) = IUniswapV2Router01(routerAddress).addLiquidity(
                _wantAddress,
                _pairAddress,
                _want,
                _pair,
                0,
                0,
                address(this),
                block.timestamp
            );
        require(
            _amountToken > 0 && _amountETH > 0 && _liquidity > 0,
            "no liquidity added"
        );
    }

    function _convertLpToWant(
        address _wantAddress,
        address _pairAddress,
        uint8 _pid
    ) internal {
        FarmInfo memory activeFarm = farmInfo[_pid];
        address lpAddress = activeFarm.lpAddress;
        address routerAddress = activeFarm.routerAddress;
        uint256 _lp = IERC20(lpAddress).balanceOf(address(this));
        IERC20(lpAddress).safeIncreaseAllowance(routerAddress, _lp);
        (uint256 _amountA, uint256 _amountB) = IUniswapV2Router01(routerAddress)
            .removeLiquidity(
                _wantAddress,
                _pairAddress,
                _lp,
                0,
                0,
                address(this),
                block.timestamp
            );
        require(_amountA > 0 && _amountB > 0, "no liquidity removed");
        uint256 _pair = IERC20(_pairAddress).balanceOf(address(this));
        IERC20(_pairAddress).safeIncreaseAllowance(swapRouterAddress, _pair);

        _safeStableSwap(swapPid[_pairAddress], swapPid[_wantAddress], _pair);
    }

    /* ========== UTILITY FUNCTIONS ========== */

    function _safeStableSwap(
        int128 _from,
        int128 _to,
        uint256 _amountIn
    ) internal {
        uint256 amountOut = IStableSwap(swapRouterAddress).get_dy(
            _from,
            _to,
            _amountIn
        );
        require(
            (_amountIn * 9900) / 10000 < amountOut &&
                (_amountIn * 10100) / 10000 > amountOut,
            "Slippage too high"
        );
        IStableSwap(swapRouterAddress).exchange(
            _from,
            _to,
            _amountIn,
            (amountOut * 9900) / 10000
        );
    }

    /* ========== VIEWS ========== */

    function balances(address user)
        external
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            userInfo[user][0].balance,
            userInfo[user][1].balance,
            userInfo[user][2].balance
        );
    }
}
