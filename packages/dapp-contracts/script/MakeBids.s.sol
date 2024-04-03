// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import {GlitchAuction} from '../src/GlitchAuction.sol';

import {BaseScript} from './Base.s.sol';
import {console2} from 'forge-std/src/console2.sol';
import {VmSafe} from 'forge-std/src/Vm.sol';

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract MakeBids is BaseScript {
  function run() public {
    _fillBids();
  }

  function _fillBids() internal {
    address auctionAddress = vm.envOr({name: 'AUCTION_ADDRESS', defaultValue: address(0)});
    uint256 qty = vm.envOr({name: 'QTY', defaultValue: uint256(0)});
    console2.log('auctionAddress', auctionAddress);
    console2.log('qty', qty);
    for (uint256 i = 0; i < qty; i++) {
      VmSafe.Wallet memory user = vm.createWallet(i + 10);
      uint256 value = (i + 1) * 0.1 ether;
      vm.startBroadcast(broadcaster);
      payable(user.addr).transfer(10 ether);
      vm.stopBroadcast();
      vm.startBroadcast(user.privateKey);
      GlitchAuction(auctionAddress).bid{value: value}(value, new bytes32[](1));
      vm.stopBroadcast();
    }
  }
}
