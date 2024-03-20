// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23;

import { Strings } from '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import { ERC721URIStorage } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import { ERC721Burnable } from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import { Ownable } from '@openzeppelin/contracts/access/Ownable.sol';

enum TokenVersion {
  A,
  B,
  C,
  D
}

contract Glitch is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
  uint256 private _nextTokenId = 0;
  uint16 private _tokenIdMax = 100;
  string private _baseURIValue;
  address private _minterContractAddress;
  mapping(uint256 tokenId => TokenVersion version) private _tokenVersionMap;

  constructor(address initialOwner) ERC721('glitch', 'GLT') Ownable(initialOwner) {
    _baseURIValue = 'http://localhost:3000/arts/';
    _minterContractAddress = initialOwner;
  }

  function mint(address recipient) external {
    require(msg.sender == _minterContractAddress || msg.sender == owner(), 'Only minter contract and owner can mint');
    require(_nextTokenId < _tokenIdMax, 'Max. supply reached');
    return _safeMint(recipient, _nextTokenId++);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    _requireOwned(tokenId);
    return string(abi.encodePacked(_baseURIValue, getTokenVersion(tokenId), '/', Strings.toString(tokenId)));
  }

  function totalSupply() public view returns (uint256) {
    return _nextTokenId;
  }

  function getTokenVersion(uint256 tokenId) public view returns (string memory versionStr) {
    TokenVersion versionEnum = _tokenVersionMap[tokenId];
    if (versionEnum == TokenVersion.A) {
      versionStr = 'A';
    } else if (versionEnum == TokenVersion.B) {
      versionStr = 'B';
    } else if (versionEnum == TokenVersion.C) {
      versionStr = 'C';
    } else if (versionEnum == TokenVersion.D) {
      versionStr = 'D';
    }
  }

  function getAllTokensVersion() public view returns (string[] memory versions) {
    versions = new string[](_nextTokenId);
    for (uint i = 0; i < _nextTokenId; i++) {
      versions[i] = getTokenVersion(i);
    }
  }

  function _updateTokenURI(uint256 tokenId) internal {
    TokenVersion nextVersion = _tokenVersionMap[tokenId];

    if (nextVersion == TokenVersion.D) {
      return;
    }

    if (nextVersion == TokenVersion.A) {
      nextVersion = TokenVersion.B;
    } else if (nextVersion == TokenVersion.B) {
      nextVersion = TokenVersion.C;
    } else if (nextVersion == TokenVersion.C) {
      nextVersion = TokenVersion.D;
    }

    _tokenVersionMap[tokenId] = nextVersion;
  }

  function refreshToken(uint256 tokenId) public {
    _tokenVersionMap[tokenId] = TokenVersion.A;
  }

  function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
    super.transferFrom(from, to, tokenId);
    _updateTokenURI(tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
