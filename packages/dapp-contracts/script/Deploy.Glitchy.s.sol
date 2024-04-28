// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {GlitchyGridGrid} from '../src/GlitchyGridGrid.sol';
import {BaseScript} from './Base.s.sol';

contract DeployGlitchyLocal is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'https://glitch.mishaderidder.com/mint-edition/metadata/';
    uint256 startTime = block.timestamp + (0);
    uint256 endTime = startTime + (3600 * 1);

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid, deployer);
    glitchy.setConfig(startTime, endTime);
    glitchy.setDiscountAllowlistRoot(0x4327a733a1f371691a5f256a666697c4c6c66f58ad97072995821e0fc35ced65);
    glitchy.setFreeClaimAllowlistRoot(0x2e9682bdda23b84ccad52e90f7f60a2747d877961cefaf058657f0c58a7ccf74);
    vm.stopBroadcast();
  }
}

contract DeployGlitchySepolia is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'https://glitch.mishaderidder.com/mint-edition/metadata/';
    uint256 startTime = block.timestamp + (0);
    uint256 endTime = startTime + (3600 * 5);

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid, deployer);
    glitchy.setConfig(startTime, endTime);
    glitchy.setDiscountAllowlistRoot(0x4327a733a1f371691a5f256a666697c4c6c66f58ad97072995821e0fc35ced65);
    glitchy.setFreeClaimAllowlistRoot(0x00a3b3113c241a0d64a1ad7bc667423e5a4eaff99d2444c9f35013592697236e);
    vm.stopBroadcast();
  }
}
contract DeployGlitchyMainnet is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    address treasury = 0xE3b32779000D86b3a3251Afe2248B706D83d816b; // arod cold wallet
    string memory baseURIGlitchyGridGrid = 'https://glitch.mishaderidder.com/mint-edition/metadata/';
    uint256 startTime = 1714323600;
    uint256 endTime = 1714967940;

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid, treasury);
    glitchy.setConfig(startTime, endTime);
    glitchy.setDiscountAllowlistRoot(0x4327a733a1f371691a5f256a666697c4c6c66f58ad97072995821e0fc35ced65);
    glitchy.setFreeClaimAllowlistRoot(0x2e9682bdda23b84ccad52e90f7f60a2747d877961cefaf058657f0c58a7ccf74);

    vm.stopBroadcast();
  }
}
