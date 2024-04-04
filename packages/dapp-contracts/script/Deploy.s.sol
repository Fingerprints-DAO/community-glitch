// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import {Glitch} from '../src/Glitch.sol';
import {GlitchAuction} from '../src/GlitchAuction.sol';

import {BaseScript} from './Base.s.sol';

import {console2} from 'forge-std/src/console2.sol';

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is BaseScript {
  function run(
    address deployer,
    address minter,
    string memory baseURI,
    uint256 startTime,
    uint256 endTime,
    uint256 minBidIncrementInWei,
    uint256 startAmountInWei
  ) public broadcast returns (Glitch glitch, GlitchAuction auction) {
    vm.startBroadcast();
    glitch = _deployGlitch(deployer, minter, baseURI);
    auction = _deployAuction(address(glitch), deployer, startTime, endTime, minBidIncrementInWei, startAmountInWei);
    vm.stopBroadcast();
  }
}

contract DeployLocal is BaseScript {
  function run() public returns (Glitch glitch, GlitchAuction auction) {
    address deployer = broadcaster;
    address minter = broadcaster;
    string memory baseURI = 'http://localhost:3000/arts/';
    uint256 startTime = block.timestamp + (3600 * 0.1);
    uint256 endTime = startTime + (3600 * 1);
    uint256 minBidIncrementInWei = 0.005 ether;
    uint256 startAmountInWei = 0.006 ether;

    vm.startBroadcast();
    glitch = _deployGlitch(deployer, minter, baseURI);
    auction = _deployAuction(address(glitch), deployer, startTime, endTime, minBidIncrementInWei, startAmountInWei);
    vm.stopBroadcast();
  }
}
