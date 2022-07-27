// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface IDeFiAIStableStrat  {
    function deposit(
        address user,
        uint256 _wantAmt,
        address _wantAddress
    ) external returns (uint256);

    function withdraw(
        uint8 _pid,
        address user,
        uint256 _wantAmt,
        address _wantAddress
    ) external returns (uint256);

    function balances(address user) external view returns (uint256);

    function claimReward(uint8 _pid, address user) external;
}
