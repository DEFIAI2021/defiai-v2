// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface IBiswapFarm {
    function poolLength() external view returns (uint256);

    function userInfo(uint, address) external view returns (uint256[2] memory);

    // Return reward multiplier over the given _from to _to block.
    function getMultiplier(uint256 _from, uint256 _to)
        external
        view
        returns (uint256);

    // View function to see pending BSWs on frontend.
    function pendingBSW(uint256 _pid, address _user)
        external
        view
        returns (uint256);

    // Deposit LP tokens to MasterChef for BSW allocation.
    function deposit(uint256 _pid, uint256 _amount) external;

    // Withdraw LP tokens from MasterChef.
    function withdraw(uint256 _pid, uint256 _amount) external;

    // Stake CAKE tokens to MasterChef
    function enterStaking(uint256 _amount) external;

    // Withdraw CAKE tokens from STAKING.
    function leaveStaking(uint256 _amount) external;

    // Withdraw without caring about rewards. EMERGENCY ONLY.
    function emergencyWithdraw(uint256 _pid) external;
}