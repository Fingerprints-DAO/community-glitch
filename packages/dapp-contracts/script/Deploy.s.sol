// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

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
    auction = _deployAuction(address(glitch), deployer, deployer, startTime, endTime, minBidIncrementInWei, startAmountInWei);
    vm.stopBroadcast();
  }
}

contract DeployLocal is BaseScript {
  function run() public returns (Glitch glitch, GlitchAuction auction) {
    address deployer = broadcaster;
    address minter = broadcaster;
    string memory baseURI = 'http://localhost:3000/arts/';
    uint256 startTime = block.timestamp + (3600 * 0);
    uint256 endTime = startTime + (60 * 5);
    // uint256 endTime = startTime + (3600 * 1);
    uint256 minBidIncrementInWei = 0.005 ether;
    uint256 startAmountInWei = 0.04 ether;

    vm.startBroadcast();
    glitch = _deployGlitch(deployer, minter, baseURI);
    auction = _deployAuction(address(glitch), deployer, deployer, startTime, endTime, minBidIncrementInWei, startAmountInWei);
    auction.setMerkleRoots(0xc65cfff3957d3e32ee797a76ee48f645c1d54219732b342756fb72caf73ba890);
    vm.stopBroadcast();
  }
}

contract DeploySepolia is BaseScript {
  function run() public returns (Glitch glitch, GlitchAuction auction) {
    address deployer = broadcaster;
    address minter = broadcaster;
    string memory baseURI = 'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/edition/metadata/';
    uint256 startTime = block.timestamp + (3600 * 0.5);
    uint256 endTime = startTime + (3600 * 5);
    uint256 minBidIncrementInWei = 0.005 ether;
    uint256 startAmountInWei = 0.04 ether;

    vm.startBroadcast();
    glitch = _deployGlitch(deployer, minter, baseURI);
    auction = _deployAuction(address(glitch), deployer, deployer, startTime, endTime, minBidIncrementInWei, startAmountInWei);
    auction.setMerkleRoots(0xc65cfff3957d3e32ee797a76ee48f645c1d54219732b342756fb72caf73ba890);
    vm.stopBroadcast();
  }
}
contract DeployMainnet is BaseScript {
  function run() public returns (Glitch glitch, GlitchAuction auction) {
    address deployer = broadcaster;
    address minter = broadcaster;
    string memory baseURI = 'https://glitch.mishaderidder.com/edition/metadata/';
    uint256 startTime = 1714064400; // April 25 2024, 14:00 GMT-3
    uint256 endTime = 1714323600; // April 28 2024, 14:00 GMT-3
    uint256 minBidIncrementInWei = 0.005 ether;
    uint256 startAmountInWei = 0.04 ether;

    vm.startBroadcast();
    glitch = _deployGlitch(deployer, minter, baseURI);
    auction = _deployAuction(
      address(glitch),
      deployer,
      0xE3b32779000D86b3a3251Afe2248B706D83d816b,
      startTime,
      endTime,
      minBidIncrementInWei,
      startAmountInWei
    );
    // auction.setMerkleRoots(0xc65cfff3957d3e32ee797a76ee48f645c1d54219732b342756fb72caf73ba890);
    vm.stopBroadcast();
  }
}
