// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {GlitchyGridGrid} from '../src/GlitchyGridGrid.sol';
import {BaseScript} from './Base.s.sol';

contract DeployGlitchyLocal is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'http://localhost:3000/mint-edition/metadata/';
    uint256 startTime = block.timestamp + (60);
    uint256 endTime = startTime + (3600 * 1);

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    glitchy.setConfig(startTime, endTime);
    glitchy.setDiscountAllowlistRoot(0xc65cfff3957d3e32ee797a76ee48f645c1d54219732b342756fb72caf73ba890);
    vm.stopBroadcast();
  }
}

contract DeployGlitchySepolia is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/mint-edition/metadata/';
    uint256 startTime = block.timestamp + (3600 * 1);
    uint256 endTime = startTime + (3600 * 10);

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    glitchy.setConfig(startTime, endTime);
    glitchy.setDiscountAllowlistRoot(0xc65cfff3957d3e32ee797a76ee48f645c1d54219732b342756fb72caf73ba890);
    vm.stopBroadcast();
  }
}
contract DeployGlitchyMainnet is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'https://glitch.mishaderidder.com/mint-edition/metadata/';
    uint256 startTime = 1714323600;
    uint256 endTime = 1714967940;

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    glitchy.setConfig(startTime, endTime);

    vm.stopBroadcast();
  }
}
