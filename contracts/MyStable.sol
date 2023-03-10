// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MYToken is ERC20 {
    constructor() ERC20("MyTokenname", "MyTokenSymbol") {
        _mint(msg.sender, 100000000000000000000000000000000000000000000000000000000000000000000000000000);
    }
}