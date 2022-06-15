// // SPDX-License-Identifier: MIT

// pragma solidity 0.8.4;


// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/security/Pausable.sol";
// import "./interfaces/IDeFiAIMultiStrat.sol";
// import "./interfaces/IDeFiAIStrat.sol";
// import "../pcs/interfaces/IPancakeswapFarm.sol";

// interface IUniswapV2Router01 {
//   function factory() external pure returns (address);
//   function WETH() external pure returns (address);

//   function addLiquidity(
//       address tokenA,
//       address tokenB,
//       uint amountADesired,
//       uint amountBDesired,
//       uint amountAMin,
//       uint amountBMin,
//       address to,
//       uint deadline
//   ) external returns (uint amountA, uint amountB, uint liquidity);
//   function addLiquidityETH(
//       address token,
//       uint amountTokenDesired,
//       uint amountTokenMin,
//       uint amountETHMin,
//       address to,
//       uint deadline
//   ) external payable returns (uint amountToken, uint amountETH, uint liquidity);
//   function removeLiquidity(
//       address tokenA,
//       address tokenB,
//       uint liquidity,
//       uint amountAMin,
//       uint amountBMin,
//       address to,
//       uint deadline
//   ) external returns (uint amountA, uint amountB);
//   function removeLiquidityETH(
//       address token,
//       uint liquidity,
//       uint amountTokenMin,
//       uint amountETHMin,
//       address to,
//       uint deadline
//   ) external returns (uint amountToken, uint amountETH);
//   function removeLiquidityWithPermit(
//       address tokenA,
//       address tokenB,
//       uint liquidity,
//       uint amountAMin,
//       uint amountBMin,
//       address to,
//       uint deadline,
//       bool approveMax, uint8 v, bytes32 r, bytes32 s
//   ) external returns (uint amountA, uint amountB);
//   function removeLiquidityETHWithPermit(
//       address token,
//       uint liquidity,
//       uint amountTokenMin,
//       uint amountETHMin,
//       address to,
//       uint deadline,
//       bool approveMax, uint8 v, bytes32 r, bytes32 s
//   ) external returns (uint amountToken, uint amountETH);
//   function swapExactTokensForTokens(
//       uint amountIn,
//       uint amountOutMin,
//       address[] calldata path,
//       address to,
//       uint deadline
//   ) external returns (uint[] memory amounts);
//   function swapTokensForExactTokens(
//       uint amountOut,
//       uint amountInMax,
//       address[] calldata path,
//       address to,
//       uint deadline
//   ) external returns (uint[] memory amounts);
//   function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
//       external
//       payable
//       returns (uint[] memory amounts);
//   function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
//       external
//       returns (uint[] memory amounts);
//   function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
//       external
//       returns (uint[] memory amounts);
//   function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
//       external
//       payable
//       returns (uint[] memory amounts);

//   function quote(uint amountA, uint reserveA, uint reserveB) external pure returns (uint amountB);
//   function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) external pure returns (uint amountOut);
//   function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) external pure returns (uint amountIn);
//   function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts);
//   function getAmountsIn(uint amountOut, address[] calldata path) external view returns (uint[] memory amounts);
// }

// interface IUniswapV2Router02 is IUniswapV2Router01 {
//     function removeLiquidityETHSupportingFeeOnTransferTokens(
//         address token,
//         uint liquidity,
//         uint amountTokenMin,
//         uint amountETHMin,
//         address to,
//         uint deadline
//     ) external returns (uint amountETH);
//     function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
//         address token,
//         uint liquidity,
//         uint amountTokenMin,
//         uint amountETHMin,
//         address to,
//         uint deadline,
//         bool approveMax, uint8 v, bytes32 r, bytes32 s
//     ) external returns (uint amountETH);

//     function swapExactTokensForTokensSupportingFeeOnTransferTokens(
//         uint amountIn,
//         uint amountOutMin,
//         address[] calldata path,
//         address to,
//         uint deadline
//     ) external;
//     function swapExactETHForTokensSupportingFeeOnTransferTokens(
//         uint amountOutMin,
//         address[] calldata path,
//         address to,
//         uint deadline
//     ) external payable;
//     function swapExactTokensForETHSupportingFeeOnTransferTokens(
//         uint amountIn,
//         uint amountOutMin,
//         address[] calldata path,
//         address to,
//         uint deadline
//     ) external;
// }

// contract DeFiAIMultiStrat is IDeFiAIMultiStrat, ReentrancyGuard, Ownable, Pausable {
//     using SafeERC20 for IERC20;

//     /* ========== CONSTANTS ============= */

//     uint256 public constant DIVISOR = 10000;

//     // Maximum slippage factor.
//     uint256 public constant SLIPPAGE_FACTOR_MAX = 10000;

//     /* ========== STATE VARIABLES ========== */

//     // Address of the AMM Pool Router.
//     address public uniRouterAddress;

//     address public tokenA;

//     address public tokenB;

//     // Address of the want token.
//     // address public wantAddress;

//     // Address of opposite pair token.
//     // address public pairAddress;
    
//     // Developer address.
//     address public devAddress;

//     // DeFiAI Farm address.
//     address public defiaiFarmAddress;

//     // Withdrawal multiplier to account for slippage 
//     uint256 public withdrawalMultiplier;

//     address public stratAddress;

//     // Information about each farm
//     FarmInfo[2] public farmInfo;

//     /* ========== MODIFIERS ========== */

//     modifier onlyFarms() {
//         require(
//             msg.sender == defiaiFarmAddress,
//             "DeFiAIMultiStrat::onlyFarms: Caller is not a farms"
//         );
//         _;
//     }

//     modifier onlyGovernance() {
//         require(
//             (msg.sender == devAddress || msg.sender == owner()),
//             "DeFiAIMultiStrat::onlyGovernance: Not gov"
//         );
//         _;
//     }

//     /* ========== CONSTRUCTOR ========== */

//     constructor(
//         address _uniRouterAddress, 
//         address _tokenA, 
//         address _tokenB, 
//         address _devAddress, 
//         address _defiaiFarmAddress, 
//         uint256 _withdrawalMultiplier, 
//         address[] memory _pcsAddresses, 
//         uint256 _pcsPid, 
//         address[] memory _mdexAddresses,
//         uint256 _mdxPid,
//         address _stratAddress
//     ) {
//         uniRouterAddress = _uniRouterAddress;
//         tokenA = _tokenA;
//         tokenB = _tokenB;
//         devAddress = _devAddress;
//         defiaiFarmAddress = _defiaiFarmAddress;
//         withdrawalMultiplier = _withdrawalMultiplier;
//         stratAddress = _stratAddress;

//         farmInfo[0] = FarmInfo(_pcsAddresses[0], _pcsAddresses[1], _pcsAddresses[2], _pcsAddresses[3], _pcsPid);
//         farmInfo[1] = FarmInfo(_mdexAddresses[0], _mdexAddresses[1], _mdexAddresses[2], _mdexAddresses[3], _mdxPid);

//     }

//     function balances(address user) external view override returns (uint256) {
//         return IDeFiAIStrat(stratAddress).getUserWant(user);
//     }

//     /* ========== MUTATIVE FUNCTIONS ========== */

//     function deposit(address user, uint256 _wantAmt, address _wantAddress)
//         external
//         virtual
//         override
//         onlyFarms
//         nonReentrant
//         whenNotPaused
//         returns (uint256)
//     {
//         IERC20(_wantAddress).safeTransferFrom(
//             address(msg.sender),
//             address(this),
//             _wantAmt
//         );
//         _wantAmt = IDeFiAIStrat(stratAddress).deposit(user, _wantAmt);

//         _convertWantToLp(
//             _wantAddress,
//             _wantAddress == tokenA ? tokenB : tokenA
//         );
//         _farm();
//         _collect();
//         return _wantAmt;
//     }

//     function withdraw(address user, uint256 _wantAmt, address _wantAddress)
//         external
//         override
//         virtual
//         onlyFarms
//         nonReentrant
//         returns (uint256)
//     {
//         require(_wantAmt > 0, "DeFiAIMultiStrat::withdraw: Zero _wantAmt");
//         _wantAmt = IDeFiAIStrat(stratAddress).withdraw(user, _wantAmt);
//         _unfarm(_wantAmt);

//         _convertLpToWant(
//             _wantAddress,
//             _wantAddress == tokenA ? tokenB : tokenA
//         );
//         uint256 wantAmt = IERC20(_wantAddress).balanceOf(address(this));
//         if (_wantAmt > wantAmt) {
//             _wantAmt = wantAmt;
//         }

//         IERC20(_wantAddress).safeTransfer(defiaiFarmAddress, _wantAmt);
//         _collect();
//         return _wantAmt;
//     }

//     function migrateLp() external {
        
//     }

//     /* ========== RESTRICTED FUNCTIONS ========== */

//     function setDevAddress(address _devAddress)
//         public
//         virtual
//         onlyGovernance
//     {
//         require(_devAddress != address(0), "DeFiAIMultiStrat::set: Zero address");
//         devAddress = _devAddress;
//         emit SetDevAddress(msg.sender, _devAddress);
//     }

//     function pause() public onlyGovernance {
//         _pause();
//     }

//     function unpause() public onlyGovernance {
//         _unpause();
//     }

//     function updateWithdrawalMultiplier(uint256 _withdrawalMultiplier) external onlyGovernance {
//         require(_withdrawalMultiplier <= DIVISOR, "DeFiAIMultiStrat::updateWithdrawalMultiplier: Multiplier > max");
//         withdrawalMultiplier = _withdrawalMultiplier;
//     }

//     /* ========== PRIVATE FUNCTIONS ========== */

//     function _farm() internal virtual {
//         uint256 lp0Amt = IERC20(farmInfo[0].lpAddress).balanceOf(address(this));
//         uint256 lp1Amt = IERC20(farmInfo[1].lpAddress).balanceOf(address(this));
//         IERC20(farmInfo[0].lpAddress).safeIncreaseAllowance(farmInfo[0].farmAddress, lp0Amt);
//         IPancakeswapFarm(farmInfo[0].farmAddress).deposit(farmInfo[0].pid, lp0Amt);

//         IERC20(farmInfo[1].lpAddress).safeIncreaseAllowance(farmInfo[1].farmAddress, lp1Amt);
//         IPancakeswapFarm(farmInfo[1].farmAddress).deposit(farmInfo[1].pid, lp1Amt);
//     }

//     function _unfarm(uint256 _wantAmt) internal virtual {

//         uint256 amountPcs = _wantAmt / 4 * withdrawalMultiplier / DIVISOR;
//         uint256 amountMdex = amountPcs;
        
//         (uint256 _pcsBalance, ) = IPancakeswapFarm(farmInfo[0].farmAddress).userInfo(farmInfo[0].pid, address(this));
//         (uint256 _mdexBalance, ) = IPancakeswapFarm(farmInfo[1].farmAddress).userInfo(farmInfo[1].pid, address(this));
//         if (amountPcs > _pcsBalance) {
//             amountPcs = _pcsBalance;
//         }
//         if (amountMdex > _mdexBalance) {
//             amountMdex = _mdexBalance;
//         }

//         IPancakeswapFarm(farmInfo[0].farmAddress).withdraw(farmInfo[0].pid, amountPcs);
//         IPancakeswapFarm(farmInfo[1].farmAddress).withdraw(farmInfo[1].pid, amountMdex);
//     }

//     function _collect() internal virtual {
//         uint256 _cake = IERC20(farmInfo[0].earnedAddress).balanceOf(address(this));
//         uint256 _mdex = IERC20(farmInfo[1].earnedAddress).balanceOf(address(this));

//         IERC20(farmInfo[0].earnedAddress).transfer(devAddress, _cake);
//         IERC20(farmInfo[1].earnedAddress).transfer(devAddress, _mdex);
//     }

//     function _convertWantToLp(address _wantAddress, address _pairAddress) internal {
//         uint wantAmt = IERC20(_wantAddress).balanceOf(address(this));
//         address[] memory path = new address[](2);
//         path[0] = _wantAddress;
//         path[1] = _pairAddress;
//         IERC20(_wantAddress).safeIncreaseAllowance(farmInfo[0].routerAddress, wantAmt / 2);
//         _safeSwap(
//             farmInfo[0].routerAddress, 
//             wantAmt/2, 
//             9900,
//             path, 
//             address(this), 
//             block.timestamp + 60
//         );

//         uint _tokenA = IERC20(_wantAddress).balanceOf(address(this));
//         uint _tokenB = IERC20(_pairAddress).balanceOf(address(this));
//         IERC20(_wantAddress).safeIncreaseAllowance(farmInfo[0].routerAddress, _tokenA / 2);
//         IERC20(_pairAddress).safeIncreaseAllowance(farmInfo[0].routerAddress, _tokenB / 2);
//         IUniswapV2Router02(farmInfo[0].routerAddress).addLiquidity(
//             _wantAddress, 
//             _pairAddress, 
//             _tokenA / 2, 
//             _tokenB / 2, 
//             0, 
//             0, 
//             address(this), 
//             block.timestamp + 60
//         );

//         _tokenA = IERC20(_wantAddress).balanceOf(address(this));
//         _tokenB = IERC20(_pairAddress).balanceOf(address(this));

//         IERC20(_wantAddress).safeIncreaseAllowance(farmInfo[1].routerAddress, _tokenA);
//         IERC20(_pairAddress).safeIncreaseAllowance(farmInfo[1].routerAddress, _tokenB);
//         IUniswapV2Router02(farmInfo[1].routerAddress).addLiquidity(
//             _wantAddress, 
//             _pairAddress, 
//             _tokenA, 
//             _tokenB, 
//             0, 
//             0, 
//             address(this), 
//             block.timestamp + 60
//         );
//     }

//     function _convertLpToWant(address _wantAddress, address _pairAddress) internal {
//         uint256 _cakeLp = IERC20(farmInfo[0].lpAddress).balanceOf(address(this));
//         IERC20(farmInfo[0].lpAddress).safeIncreaseAllowance(farmInfo[0].routerAddress, _cakeLp);
//         IUniswapV2Router02(farmInfo[0].routerAddress).removeLiquidity(
//             _wantAddress,
//             _pairAddress,
//             _cakeLp,
//             0,
//             0,
//             address(this),
//             block.timestamp + 60
//         );

//         uint256 _mdexLp = IERC20(farmInfo[1].lpAddress).balanceOf(address(this));
//         IERC20(farmInfo[1].lpAddress).safeIncreaseAllowance(farmInfo[1].routerAddress, _mdexLp);
//         IUniswapV2Router02(farmInfo[1].routerAddress).removeLiquidity(
//             _wantAddress,
//             _pairAddress,
//             _mdexLp,
//             0,
//             0,
//             address(this),
//             block.timestamp + 60
//         );
//         address[] memory path = new address[](2);
//         path[0] = _pairAddress;
//         path[1] = _wantAddress;
//         uint _pair = IERC20(_pairAddress).balanceOf(address(this));
//         IERC20(_pairAddress).safeIncreaseAllowance(farmInfo[0].routerAddress, _pair);
//         _safeSwap(
//             farmInfo[0].routerAddress, 
//             _pair, 
//             9900,
//             path, 
//             address(this), 
//             block.timestamp + 60
//         );
//     }

//     /* ========== UTILITY FUNCTIONS ========== */

//     function _safeSwap(
//         address _uniRouterAddress,
//         uint256 _amountIn,
//         uint256 _slippageFactor,
//         address[] memory _path,
//         address _to,
//         uint256 _deadline
//     ) internal virtual {
//         uint256 amountOut;
//         try IUniswapV2Router02(_uniRouterAddress)
//             .getAmountsOut(_amountIn, _path) 
//             returns (uint256[] memory amounts) {
//             amountOut = amounts[amounts.length - 1];
//             if (amountOut == 0) return;
//         } catch {
//             return;
//         }

//         IUniswapV2Router02(_uniRouterAddress)
//             .swapExactTokensForTokensSupportingFeeOnTransferTokens(
//             _amountIn,
//             amountOut * _slippageFactor / SLIPPAGE_FACTOR_MAX,
//             _path,
//             _to,
//             _deadline
//         );
//     }
// }
