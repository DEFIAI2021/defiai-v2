// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IDeFiAIMultiStrat.sol";
import "./interfaces/IDeFiAIStrat.sol";
import "../pcs/interfaces/IPancakeswapFarm.sol";
import "../acs/interfaces/IStableSwap.sol";

interface IUniswapV2Router01 {
  function factory() external pure returns (address);
  function WETH() external pure returns (address);

  function addLiquidity(
      address busd,
      address usdt,
      uint amountADesired,
      uint amountBDesired,
      uint amountAMin,
      uint amountBMin,
      address to,
      uint deadline
  ) external returns (uint amountA, uint amountB, uint liquidity);
  function addLiquidityETH(
      address token,
      uint amountTokenDesired,
      uint amountTokenMin,
      uint amountETHMin,
      address to,
      uint deadline
  ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
  function removeLiquidity(
      address busd,
      address usdt,
      uint liquidity,
      uint amountAMin,
      uint amountBMin,
      address to,
      uint deadline
  ) external returns (uint amountA, uint amountB);
  function removeLiquidityETH(
      address token,
      uint liquidity,
      uint amountTokenMin,
      uint amountETHMin,
      address to,
      uint deadline
  ) external returns (uint amountToken, uint amountETH);
  function removeLiquidityWithPermit(
      address busd,
      address usdt,
      uint liquidity,
      uint amountAMin,
      uint amountBMin,
      address to,
      uint deadline,
      bool approveMax, uint8 v, bytes32 r, bytes32 s
  ) external returns (uint amountA, uint amountB);
  function removeLiquidityETHWithPermit(
      address token,
      uint liquidity,
      uint amountTokenMin,
      uint amountETHMin,
      address to,
      uint deadline,
      bool approveMax, uint8 v, bytes32 r, bytes32 s
  ) external returns (uint amountToken, uint amountETH);
  function swapExactTokensForTokens(
      uint amountIn,
      uint amountOutMin,
      address[] calldata path,
      address to,
      uint deadline
  ) external returns (uint[] memory amounts);
  function swapTokensForExactTokens(
      uint amountOut,
      uint amountInMax,
      address[] calldata path,
      address to,
      uint deadline
  ) external returns (uint[] memory amounts);
  function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      payable
      returns (uint[] memory amounts);
  function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts);
  function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
      external
      returns (uint[] memory amounts);
  function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
      external
      payable
      returns (uint[] memory amounts);

  function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
  function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
  function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
  function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
  function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
}

contract DeFiAIStableStrat is IDeFiAIMultiStrat, Ownable, Pausable {
    using SafeERC20 for IERC20;

    /* ========== STRUCTS ============= */

    struct FarmInfo {
        address farmAddress;
        address lpAddress;
        address earnedAddress;
        address routerAddress;
        uint256 pid;
    }

    /* ========== CONSTANTS ============= */

    uint256 public constant DIVISOR = 10000;

    // Maximum slippage factor.
    uint256 public constant SLIPPAGE_FACTOR_MAX = 10000;

    /* ========== STATE VARIABLES ========== */

    // Address of the Stable Pool Router.
    address public swapRouterAddress;

    // Address of BUSD.
    address public busd;

    // Address of USDT.
    address public usdt;

    // Developer address.
    address public devAddress;

    // DeFiAI Farm address.
    address public defiaiFarmAddress;

    // Withdrawal multiplier to account for slippage 
    uint256 public withdrawalMultiplier;

    address public stratAddress;

    uint8 public activePid;

    bool public isInit;

    FarmInfo[3] public farmInfo;

    mapping(address => int128) public swapPid;

    /* ========== MODIFIERS ========== */

    modifier onlyFarms() {
        require(
            msg.sender == defiaiFarmAddress,
            "DeFiAIMultiStrat::onlyFarms: Caller is not a farms"
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
        uint256 _withdrawalMultiplier,
        address _stratAddress
    ) {
        swapRouterAddress = _swapRouterAddress;
        busd = _busd;
        swapPid[busd] = 0;
        usdt = _usdt;
        swapPid[usdt] = 1;
        devAddress = _devAddress;
        defiaiFarmAddress = _defiaiFarmAddress;
        withdrawalMultiplier = _withdrawalMultiplier;
        stratAddress = _stratAddress;
    }

    function init(
        address[] memory _pcsAddresses, 
        uint256 _pcsPid, 
        address[] memory _mdexAddresses,
        uint256 _mdxPid,
        address[] memory _bswAddresses,
        uint256 _bswPid
    ) external {
        require(!isInit, "DeFiAIStableStrat::init: Already init");
        farmInfo[0] = FarmInfo(_pcsAddresses[0], _pcsAddresses[1], _pcsAddresses[2], _pcsAddresses[3], _pcsPid);
        farmInfo[1] = FarmInfo(_mdexAddresses[0], _mdexAddresses[1], _mdexAddresses[2], _mdexAddresses[3], _mdxPid);
        farmInfo[2] = FarmInfo(_bswAddresses[0], _bswAddresses[1], _bswAddresses[2], _bswAddresses[3], _bswPid);
        isInit = true;
    }

    function balances(address user) external view override returns (uint256) {
        return IDeFiAIStrat(stratAddress).getUserWant(user);
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function deposit(address user, uint256 _wantAmt, address _wantAddress)
        external
        virtual
        override
        onlyFarms
        whenNotPaused
        returns (uint256)
    {
        IERC20(_wantAddress).safeTransferFrom(
            address(msg.sender),
            address(this),
            _wantAmt
        );
        _wantAmt = IDeFiAIStrat(stratAddress).deposit(user, _wantAmt);

        _convertWantToLp(
            _wantAddress,
            _wantAddress == busd ? usdt : busd
        );
        _farm();
        _collect();
        return _wantAmt;
    }

    function withdraw(address user, uint256 _wantAmt, address _wantAddress)
        external
        override
        virtual
        onlyFarms
        returns (uint256)
    {
        require(_wantAmt > 0, "DeFiAIMultiStrat::withdraw: Zero _wantAmt");
        _wantAmt = IDeFiAIStrat(stratAddress).withdraw(user, _wantAmt);
        _unfarm(_wantAmt);

        _convertLpToWant(
            _wantAddress,
            _wantAddress == busd ? usdt : busd
        );
        uint256 wantBalance = IERC20(_wantAddress).balanceOf(address(this));
        _wantAmt = _wantAmt > wantBalance ? wantBalance : _wantAmt;

        IERC20(_wantAddress).safeTransfer(defiaiFarmAddress, _wantAmt);
        _collect();
        return _wantAmt;
    }

    function changeActiveStrategy(uint8 _newPid) external onlyGovernance {
        (uint256 _pcsBalance, ) = IPancakeswapFarm(farmInfo[activePid].farmAddress).userInfo(farmInfo[activePid].pid, address(this));
        require(_pcsBalance > 0, "Balance == 0");
        IPancakeswapFarm(farmInfo[activePid].farmAddress).withdraw(farmInfo[activePid].pid, _pcsBalance);
        IERC20(farmInfo[activePid].lpAddress).safeIncreaseAllowance(farmInfo[activePid].routerAddress, _pcsBalance);

        IUniswapV2Router01(farmInfo[activePid].routerAddress).removeLiquidity(busd, usdt, _pcsBalance, 0, 0, address(this), block.timestamp);    
        uint256 _busd = IERC20(busd).balanceOf(address(this));
        uint256 _usdt = IERC20(usdt).balanceOf(address(this));
        uint256 _earned = IERC20(farmInfo[activePid].earnedAddress).balanceOf(address(this));
        
        IERC20(busd).safeIncreaseAllowance(farmInfo[_newPid].routerAddress, _busd);
        IERC20(usdt).safeIncreaseAllowance(farmInfo[_newPid].routerAddress, _usdt);
        IERC20(farmInfo[activePid].earnedAddress).transfer(devAddress, _earned);

        IUniswapV2Router01(farmInfo[_newPid].routerAddress).addLiquidity(
            busd,
            usdt,
            _busd, 
            _usdt,
            0,
            0,
            address(this),
            block.timestamp
        );

        uint256 _newLp = IERC20(farmInfo[_newPid].lpAddress).balanceOf(address(this));
        IERC20(farmInfo[_newPid].lpAddress).safeIncreaseAllowance(farmInfo[_newPid].farmAddress, _newLp);
        IPancakeswapFarm(farmInfo[_newPid].farmAddress).deposit(farmInfo[_newPid].pid, _newLp);

        activePid = _newPid;
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function setDevAddress(address _devAddress)
        public
        virtual
        onlyGovernance
    {
        require(_devAddress != address(0), "DeFiAIMultiStrat::set: Zero address");
        devAddress = _devAddress;
    }

    function pause() public onlyGovernance {
        _pause();
    }

    function unpause() public onlyGovernance {
        _unpause();
    }

    function updateWithdrawalMultiplier(uint256 _withdrawalMultiplier) external onlyGovernance {
        require(_withdrawalMultiplier <= DIVISOR, "DeFiAIMultiStrat::updateWithdrawalMultiplier: Multiplier > max");
        withdrawalMultiplier = _withdrawalMultiplier;
    }

    /* ========== PRIVATE FUNCTIONS ========== */

    function _farm() internal virtual {
        uint256 _lp = IERC20(farmInfo[activePid].lpAddress).balanceOf(address(this));
        IERC20(farmInfo[activePid].lpAddress).safeIncreaseAllowance(farmInfo[activePid].farmAddress, _lp);
        IPancakeswapFarm(farmInfo[activePid].farmAddress).deposit(farmInfo[activePid].pid, _lp);
    }

    function _unfarm(uint256 _wantAmt) internal virtual {
        uint256 _lp = _wantAmt / 2 * withdrawalMultiplier / DIVISOR;
        
        (uint256 _shares, ) = IPancakeswapFarm(farmInfo[activePid].farmAddress).userInfo(farmInfo[activePid].pid, address(this));
        if (_lp > _shares) {
            _lp = _shares;
        }
        IPancakeswapFarm(farmInfo[activePid].farmAddress).withdraw(farmInfo[activePid].pid, _lp);
    }

    function _collect() internal virtual {
        uint256 _earned = IERC20(farmInfo[activePid].earnedAddress).balanceOf(address(this));
        IERC20(farmInfo[activePid].earnedAddress).transfer(devAddress, _earned);
    }

    function _convertWantToLp(address _wantAddress, address _pairAddress) internal {
        uint wantAmt = IERC20(_wantAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeIncreaseAllowance(swapRouterAddress, wantAmt / 2);
        _safeStableSwap(
            swapPid[_wantAddress], 
            swapPid[_pairAddress], 
            wantAmt/2
        );

        uint _want = IERC20(_wantAddress).balanceOf(address(this));
        uint _pair = IERC20(_pairAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeIncreaseAllowance(farmInfo[activePid].routerAddress, _want);
        IERC20(_pairAddress).safeIncreaseAllowance(farmInfo[activePid].routerAddress, _pair);
        IUniswapV2Router01(farmInfo[activePid].routerAddress).addLiquidity(
            _wantAddress, 
            _pairAddress, 
            _want, 
            _pair, 
            0, 
            0, 
            address(this), 
            block.timestamp
        );
    }

    function _convertLpToWant(address _wantAddress, address _pairAddress) internal {
        uint256 _lp = IERC20(farmInfo[activePid].lpAddress).balanceOf(address(this));
        IERC20(farmInfo[activePid].lpAddress).safeIncreaseAllowance(farmInfo[activePid].routerAddress, _lp);
        IUniswapV2Router01(farmInfo[activePid].routerAddress).removeLiquidity(
            _wantAddress,
            _pairAddress,
            _lp,
            0,
            0,
            address(this),
            block.timestamp
        );

        uint256 _pair = IERC20(_pairAddress).balanceOf(address(this));
        IERC20(_pairAddress).safeIncreaseAllowance(swapRouterAddress, _pair);
        
        _safeStableSwap(
            swapPid[_pairAddress], 
            swapPid[_wantAddress], 
            _pair
        );
    }

    /* ========== UTILITY FUNCTIONS ========== */

    function _safeStableSwap(
        int128 _from,
        int128 _to,
        uint256 _amountIn
    ) internal returns (uint256) {
        uint256 amountOut = IStableSwap(swapRouterAddress).get_dy(_from, _to, _amountIn);
        require(_amountIn * 9900 / 10000 < amountOut && _amountIn * 10100 / 10000 > amountOut, "Slippage too high");
        IStableSwap(swapRouterAddress).exchange(_from, _to, _amountIn, amountOut * 9900 / 10000);
    }
}
