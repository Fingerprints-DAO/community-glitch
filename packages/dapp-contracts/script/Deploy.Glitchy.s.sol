// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {GlitchyGridGrid} from '../src/GlitchyGridGrid.sol';
import {BaseScript} from './Base.s.sol';

contract DeployGlitchy is BaseScript {
  function run(address deployer) public broadcast returns (GlitchyGridGrid glitchy) {
    vm.startBroadcast();
    string memory baseURIGlitchyGridGrid = 'http://localhost:3000/glitchys/';
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    vm.stopBroadcast();
  }
}

contract DeployGlitchyLocal is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'http://localhost:3000/glitchys/';
    uint256 startTime = block.timestamp + (3600 * 0.1);
    uint256 endTime = startTime + (3600 * 1);

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    glitchy.setConfig(startTime, endTime);
    vm.stopBroadcast();
  }
}

contract DeployGlitchySepolia is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'https://community-glitch-dapp-web-app-git-develop-fingerprints.vercel.app/glitchy/metadata/';
    uint256 startTime = block.timestamp + (3600 * 0.5);
    uint256 endTime = startTime + (3600 * 5);

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    glitchy.setConfig(startTime, endTime);
    vm.stopBroadcast();
  }
}
contract DeployGlitchyMainnet is BaseScript {
  function run() public returns (GlitchyGridGrid glitchy) {
    address deployer = broadcaster;
    string memory baseURIGlitchyGridGrid = 'https://fix.me/'; //TODO
    uint256 startTime = 1714064400; //TODO
    uint256 endTime = 1714323600; //TODO

    vm.startBroadcast();
    glitchy = _deployGlitchyGridGrid(deployer, baseURIGlitchyGridGrid);
    glitchy.setConfig(startTime, endTime);

    vm.stopBroadcast();
  }
}
