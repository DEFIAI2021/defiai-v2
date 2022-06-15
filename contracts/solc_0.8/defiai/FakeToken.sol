pragma solidity 0.8.4;

import "../common/BEP20.sol";

contract FakeToken is BEP20 {
  constructor(string memory name, string memory symbol) BEP20(name, symbol) {}

  function devMint(uint amount) external {
        _mint(msg.sender, amount);
  }
}
