// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BaseScript} from './Base.s.sol';
import {Mosaic} from '../src/Mosaic.sol';

contract SetMerkleRootMosaic is BaseScript {
    function run() external {
        address mosaicAddress = vm.envAddress('MOSAIC_ADDRESS');
        bytes32 merkleRoot = vm.envBytes32('MERKLE_ROOT');

        Mosaic mosaic = Mosaic(mosaicAddress);

        vm.startBroadcast(broadcaster);
        mosaic.setMerkleRoots(merkleRoot);
        vm.stopBroadcast();
    }
}
