// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;


import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "./interfaces/IDeFiAIMultiStrat.sol";
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

contract DeFiAIStableStrat is Ownable, Pausable {
    using SafeERC20 for IERC20;

    event Init(address[] _pcsAddresses, uint256 _pcsPid, address[] _mdexAddresses, uint256 _mdxPid, address[] _bswAddresses, uint256 _bswPid);
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

    struct User{
        uint256 balance;
        uint256 accumulatedClaimedToken;
    }

    /* ========== CONSTANTS ============= */

    uint256 public constant DIVISOR = 10000;

    // Maximum slippage factor.
    uint256 public constant SLIPPAGE_FACTOR_MAX = 10000;

    /* ========== STATE VARIABLES ========== */

    // Address of the Stable Pool Router.
    address public immutable swapRouterAddress;

    // Address of BUSD.
    address public busd;

    // Address of USDT.
    address public usdt;

    // Developer address.
    address public devAddress;

    // DeFiAI Farm address.
    address public immutable defiaiFarmAddress;

    // Withdrawal multiplier to account for slippage 
    uint256 public immutable withdrawalMultiplier;

    address public immutable stratAddress;

    uint8 public activePid;

    bool public isInit;

    FarmInfo[3] public farmInfo;

    mapping(address => int128) public swapPid;

    mapping(address => User) public userInfo;

    

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
        uint256 _withdrawalMultiplier,
        address _stratAddress,
        int128 busdPid,
        int128 usdtPid
    ) {
        
        require (_swapRouterAddress != address(0), "swapRouterAddress cannot be the zero address");
        require (_busd != address(0), "busd address cannot be the zero address");
        require (_usdt != address(0), "usdt address cannot be the zero address");
        require (_devAddress != address(0), "dev address cannot be the zero address");
        require (_defiaiFarmAddress != address(0), "defiaiFarmAddress cannot be the zero address");
        require (_stratAddress != address(0), "stratAddress cannot be the zero address");
        swapRouterAddress = _swapRouterAddress;
        busd = _busd;
        swapPid[busd] = busdPid;
        usdt = _usdt;
        swapPid[usdt] = usdtPid;
        devAddress = _devAddress;
        defiaiFarmAddress = _defiaiFarmAddress;
        withdrawalMultiplier = _withdrawalMultiplier;
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
        require(_pcsAddresses.length == _mdexAddresses.length && _mdexAddresses.length == _bswAddresses.length && _bswAddresses.length == 4);
        farmInfo[0] = FarmInfo(_pcsAddresses[0], _pcsAddresses[1], _pcsAddresses[2], _pcsAddresses[3], _pcsPid, 0, 0);
        farmInfo[1] = FarmInfo(_mdexAddresses[0], _mdexAddresses[1], _mdexAddresses[2], _mdexAddresses[3], _mdxPid, 0 , 0);
        farmInfo[2] = FarmInfo(_bswAddresses[0], _bswAddresses[1], _bswAddresses[2], _bswAddresses[3], _bswPid, 0, 0);
        isInit = true;

        emit Init(_pcsAddresses, _pcsPid, _mdexAddresses, _mdxPid, _bswAddresses, _bswPid);
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    function deposit(address user, uint256 _wantAmt, address _wantAddress)
        external
        virtual
        onlyFarms
        whenNotPaused
        returns (uint256)
    {
        require(_wantAmt > 0, "DeFiAIMultiStrat::: Zero deposit_wantAmt");
        IERC20(_wantAddress).safeTransferFrom(
            address(msg.sender),
            address(this),
            _wantAmt
        );
        userInfo[user].balance += _wantAmt;

        _convertWantToLp(
            _wantAddress,
            _wantAddress == busd ? usdt : busd
        );
        _collect();
        _farm();
        farmInfo[activePid].totalShare += _wantAmt;
        return _wantAmt;
    }

    function withdraw(address user, uint256 _wantAmt, address _wantAddress)
        external
        virtual
        onlyFarms
        returns (uint256)
    {
        require(_wantAmt > 0, "DeFiAIMultiStrat::withdraw: Zero _wantAmt");
        require(_wantAmt <= userInfo[user].balance);
        userInfo[user].balance -= _wantAmt;
        _unfarm(_wantAmt);

        _convertLpToWant(
            _wantAddress,
            _wantAddress == busd ? usdt : busd
        );
        uint256 wantBalance = IERC20(_wantAddress).balanceOf(address(this));
        _wantAmt = _wantAmt > wantBalance ? wantBalance : _wantAmt;

        IERC20(_wantAddress).safeTransfer(defiaiFarmAddress, _wantAmt);
        _collect();
        uint256 newUserTokenAmount = (farmInfo[activePid].accumulatedTokenPerShare * userInfo[user].balance)/1e12;
        IERC20(farmInfo[activePid].earnedAddress).safeTransfer(user, newUserTokenAmount - userInfo[user].accumulatedClaimedToken);
        userInfo[user].accumulatedClaimedToken += newUserTokenAmount;
        farmInfo[activePid].totalShare -= _wantAmt;
        return _wantAmt;
    }

    function changeActiveStrategy(uint8 _newPid) external onlyGovernance {
        require(_newPid != activePid, "newPid is the same as activePid");
        (uint256 _pcsBalance, ) = IPancakeswapFarm(farmInfo[activePid].farmAddress).userInfo(farmInfo[activePid].pid, address(this));
        require(_pcsBalance > 0, "Balance == 0"); 
        IPancakeswapFarm(farmInfo[activePid].farmAddress).withdraw(farmInfo[activePid].pid, _pcsBalance);
        IERC20(farmInfo[activePid].lpAddress).safeIncreaseAllowance(farmInfo[activePid].routerAddress, _pcsBalance);

        (uint256 _amountA, uint256 _amountB) = IUniswapV2Router01(farmInfo[activePid].routerAddress).removeLiquidity(busd, usdt, _pcsBalance, 0, 0, address(this), block.timestamp);    
        require (_amountA > 0 && _amountB > 0, "no lp created");
        uint256 _busd = IERC20(busd).balanceOf(address(this));
        uint256 _usdt = IERC20(usdt).balanceOf(address(this));
        uint256 _earned = IERC20(farmInfo[activePid].earnedAddress).balanceOf(address(this));
        
        IERC20(busd).safeIncreaseAllowance(farmInfo[_newPid].routerAddress, _busd);
        IERC20(usdt).safeIncreaseAllowance(farmInfo[_newPid].routerAddress, _usdt);
        IERC20(farmInfo[activePid].earnedAddress).safeTransfer(devAddress, _earned);

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
        emit ChangeActiveStrategy(_newPid);
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    function setDevAddress(address _devAddress)
        external
        virtual
        onlyGovernance
    {
        require(_devAddress != address(0), "DeFiAIMultiStrat::set: Zero address");
        devAddress = _devAddress;
        emit SetDevAddress(_devAddress);
    }

    function pause() external onlyGovernance {
        _pause();
    }

    function unpause() external onlyGovernance {
        _unpause();
    }

    /* ========== PRIVATE FUNCTIONS ========== */

    function _farm() internal virtual {
        uint256 _lp = IERC20(farmInfo[activePid].lpAddress).balanceOf(address(this));
        IERC20(farmInfo[activePid].lpAddress).safeIncreaseAllowance(farmInfo[activePid].farmAddress, _lp);
        IPancakeswapFarm(farmInfo[activePid].farmAddress).deposit(farmInfo[activePid].pid, _lp);

    }

    function _unfarm(uint256 _wantAmt) internal virtual {
        uint256 _lp = _wantAmt / 2 * withdrawalMultiplier / DIVISOR;
        
        address farmAddress = farmInfo[activePid].farmAddress;
        uint256 pid = farmInfo[activePid].pid;
        (uint256 _shares, ) = IPancakeswapFarm(farmAddress).userInfo(pid, address(this));
        if (_lp > _shares) {
            _lp = _shares;
        }
        IPancakeswapFarm(farmAddress).withdraw(pid, _lp);
    }

    function _collect() internal virtual {
        uint256 _earned = IERC20(farmInfo[activePid].earnedAddress).balanceOf(address(this));
        uint256 _devEarn = (_earned * 30) / 100;
        IERC20(farmInfo[activePid].earnedAddress).safeTransfer(devAddress, _devEarn);
        farmInfo[activePid].accumulatedTokenPerShare += (_earned - _devEarn) * 1e12 / farmInfo[activePid].totalShare;

    }

    function _convertWantToLp(address _wantAddress, address _pairAddress) internal {
        uint wantAmt = IERC20(_wantAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeIncreaseAllowance(swapRouterAddress, wantAmt / 2);
        _safeStableSwap(
            swapPid[_wantAddress], 
            swapPid[_pairAddress], 
            wantAmt/2
        );
        address routerAddress = farmInfo[activePid].routerAddress;
        uint _want = IERC20(_wantAddress).balanceOf(address(this));
        uint _pair = IERC20(_pairAddress).balanceOf(address(this));
        IERC20(_wantAddress).safeIncreaseAllowance(routerAddress, _want);
        IERC20(_pairAddress).safeIncreaseAllowance(routerAddress, _pair);
        (uint256 _amountToken, uint256 _amountETH, uint256 _liquidity) = IUniswapV2Router01(routerAddress).addLiquidity(
            _wantAddress, 
            _pairAddress, 
            _want, 
            _pair, 
            0, 
            0, 
            address(this), 
            block.timestamp
        );
        require(_amountToken > 0 && _amountETH > 0 && _liquidity > 0, "no liquidity added");


    
    }

    function _convertLpToWant(address _wantAddress, address _pairAddress) internal {
        address lpAddress = farmInfo[activePid].lpAddress;
        address routerAddress = farmInfo[activePid].routerAddress;
        uint256 _lp = IERC20(lpAddress).balanceOf(address(this));
        IERC20(lpAddress).safeIncreaseAllowance(routerAddress, _lp);
        (uint256 _amountA, uint256 _amountB) = IUniswapV2Router01(routerAddress).removeLiquidity(
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
    ) internal {
        uint256 amountOut = IStableSwap(swapRouterAddress).get_dy(_from, _to, _amountIn);
        require(_amountIn * 9900 / 10000 < amountOut && _amountIn * 10100 / 10000 > amountOut, "Slippage too high");
        IStableSwap(swapRouterAddress).exchange(_from, _to, _amountIn, amountOut * 9900 / 10000);
    }
}
