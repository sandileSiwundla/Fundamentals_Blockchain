// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.34;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20{
    uint public totalSSupply = 1000000;

    constructor()ERC20("First_Token", "FT"){
        _mint(msg.sender, totalSSupply);
    }



}