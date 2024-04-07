// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20 <0.9.0;

import {Script} from 'forge-std/src/Script.sol';
import {Glitch} from '../src/Glitch.sol';
import {GlitchAuction} from '../src/GlitchAuction.sol';

abstract contract BaseScript is Script {
  /// @dev Included to enable compilation of the script without a $MNEMONIC environment variable.
  string internal constant TEST_MNEMONIC = 'test test test test test test test test test test test junk';

  /// @dev Needed for the deterministic deployments.
  bytes32 internal constant ZERO_SALT = bytes32(0);

  /// @dev The address of the transaction broadcaster.
  address internal broadcaster;

  /// @dev Used to derive the broadcaster's address if $ETH_FROM is not defined.
  string internal mnemonic;

  /// @dev Initializes the transaction broadcaster like this:
  ///
  /// - If $ETH_FROM is defined, use it.
  /// - Otherwise, derive the broadcaster address from $MNEMONIC.
  /// - If $MNEMONIC is not defined, default to a test mnemonic.
  ///
  /// The use case for $ETH_FROM is to specify the broadcaster key and its address via the command line.
  constructor() {
    address from = vm.envOr({name: 'ETH_FROM', defaultValue: address(0)});
    if (from != address(0)) {
      broadcaster = from;
    } else {
      mnemonic = vm.envOr({name: 'MNEMONIC', defaultValue: TEST_MNEMONIC});
      (broadcaster, ) = deriveRememberKey({mnemonic: mnemonic, index: 0});
    }
  }

  modifier broadcast() {
    vm.startBroadcast(broadcaster);
    _;
    vm.stopBroadcast();
  }

  function _deployGlitch(address deployer, address minter, string memory baseURI) internal returns (Glitch glitch) {
    glitch = new Glitch(deployer, minter, baseURI);
    return glitch;
  }
  function _deployAuction(
    address glitchAddress,
    address deployer,
    uint256 startTime,
    uint256 endTime,
    uint256 minBidIncrementInWei,
    uint256 startAmountInWei
  ) internal returns (GlitchAuction auction) {
    // uint256 startTime = block.timestamp + 3600 * 0.5; // 1 hour from now
    // uint256 endTime = startTime + 1800; // 1 hour after start time
    // uint256 minBidIncrementInWei = 0.005 ether;
    // uint256 startAmountInWei = 0.01 ether;

    auction = new GlitchAuction(deployer, glitchAddress, deployer);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
    Glitch(glitchAddress).setMinterContractAddress(address(auction));
  }
}
