// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

interface IDeFiAIMultiStrat {
    struct FarmInfo {
        address farmAddress;
        address lpAddress;
        address earnedAddress;
        address routerAddress;
        uint256 pid;
    }

    event SetDevAddress(address indexed user, address devAddress);

    function deposit(address user, uint256 _wantAmt) external returns (uint256);
    function withdraw(address user, uint256 _wantAmt) external returns (uint256);
}
