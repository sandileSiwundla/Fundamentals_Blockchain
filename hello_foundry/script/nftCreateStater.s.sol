// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script} from "forge-std/Script.sol";
import {TicketMarketplace} from "../src/nftCreate.sol";

contract TicketMarketplaceDeploy is Script {
    TicketMarketplace public ticketmarketplace;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        ticketmarketplace = new TicketMarketplace();

        vm.stopBroadcast();
    }
}
