// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BaseScript} from './Base.s.sol';
import {Merkle} from 'murky-merkle/src/Merkle.sol';
import {GlitchyGridGrid} from '../src/GlitchyGridGrid.sol';

contract ClaimMintGlitchy is BaseScript {
  function run() external {
    address glitchyAddress = vm.envAddress('GLITCHY_ADDRESS');

    GlitchyGridGrid glitchy = GlitchyGridGrid(glitchyAddress);

    //    // FP members - 20 nfts
    // { address: '0x13d735a4d5e966b8f7b19fc2f476bfc25c0fc7dc', qty: 1 },
    // // 8 - five for fp vault + three for cxb123
    // { address: '0xbc49de68bcbd164574847a7ced47e7475179c76b', qty: 8 },
    // // 3 for assembly
    // { address: '0xfeae88b979ec76ff83f96dfbb5cfca42b92b6a1f', qty: 3 },
    // // 10 extras to deploy wallet in case we missed someone from fp
    // { address: '0xf8176aea7bf6328567f761fa2e775366ee613dd4', qty: 10 },

    address[4] memory claimers = [
      0x13d735A4D5E966b8F7B19Fc2f476BfC25c0fc7Dc,
      0xbC49de68bCBD164574847A7ced47e7475179C76B,
      0xfEaE88b979ec76FF83F96dfBb5CFca42b92B6A1F,
      0xF8176aea7bf6328567f761fA2E775366eE613DD4
    ];
    uint8[4] memory quantities = [1, 8, 3, 10];
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](4);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(claimers[0], quantities[0]))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(claimers[1], quantities[1]))));
    data[2] = keccak256(bytes.concat(keccak256(abi.encode(claimers[2], quantities[2]))));
    data[3] = keccak256(bytes.concat(keccak256(abi.encode(claimers[3], quantities[3]))));

    vm.startBroadcast(broadcaster);
    for (uint256 i = 1; i < data.length; i++) {
      bytes32[] memory proof = m.getProof(data, i);
      glitchy.claim(claimers[i], quantities[i], proof);
    }
    vm.stopBroadcast();
  }
}
