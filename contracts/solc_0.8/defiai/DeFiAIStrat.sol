// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IDeFiAIStrat.sol";

contract DeFiAIStrat is Ownable, IDeFiAIStrat {
    struct Info {
        uint256 balance;
        uint256 lastBlock;
    }

    mapping(address => Info) private userInfo;

    address private stratAddress;

    address public devAddress;

    modifier onlyGovernance() {
        require(
            (msg.sender == devAddress || msg.sender == owner()),
            "DeFiAIStrat::onlyGovernance: Not gov"
        );
        _;
    }

    modifier onlyFarm() {
        require(msg.sender == stratAddress, "DeFiAIStrat::onlyFarm: Not gov");
        _;
    }

    constructor(address _devAddress) {
        devAddress = _devAddress;
    }

    function deposit(address user, uint256 _wantAmt)
        external
        override
        onlyFarm
        returns (uint256)
    {
        Info storage _userInfo = userInfo[user];
        _userInfo.balance += _wantAmt;
        _userInfo.lastBlock = block.number + 5;
        return _wantAmt;
    }

    function withdraw(address user, uint256 _wantAmt)
        external
        override
        onlyFarm
        returns (uint256)
    {
        Info storage _userInfo = userInfo[user];
        require(_userInfo.lastBlock < block.number, "Same block");
        _userInfo.balance -= _wantAmt;
        _userInfo.lastBlock = block.number + 5;
        return _wantAmt;
    }

    function getUserWant(address user)
        external
        view
        override
        returns (uint256)
    {
        return userInfo[user].balance;
    }

    function getLastBlock(address user) external view returns (uint256) {
        return userInfo[user].lastBlock;
    }

    function updateBalance(
        address[] calldata _users,
        uint256[] calldata _balances
    ) external onlyGovernance {
        require(
            _users.length == _balances.length,
            "DeFiAIStrat::updateBalance: _users.length != _balances.length"
        );
        for (uint256 i = 0; i < _users.length; i++) {
            userInfo[_users[i]].balance = _balances[i];
        }
    }

    function setDevAddress(address _devAddress) external onlyOwner {
        devAddress = _devAddress;
    }

    function setStratAddress(address _stratAddress) external onlyOwner {
        stratAddress = _stratAddress;
    }
}
