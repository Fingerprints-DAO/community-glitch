// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23;

import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {ERC721Burnable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

enum TokenVersion {
  A,
  B,
  C,
  D
}

contract Glitch is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
  uint256 private _nextTokenId = 1;
  uint16 private _tokenIdMax = 50;
  address private _minterContractAddress;
  string public baseURI;
  mapping(uint256 tokenId => TokenVersion version) private _tokenVersionMap;

  constructor(address initialOwner) ERC721('glitch', 'GLT') Ownable(initialOwner) {
    baseURI = 'http://localhost:3000/arts/';
    _minterContractAddress = initialOwner;
  }

  modifier _onlyMinterOrOwner() {
    require(msg.sender == _minterContractAddress || msg.sender == owner(), 'Only minter contract and owner');
    _;
  }

  modifier _onlyOwner() {
    require(msg.sender == owner(), 'Only owner');
    _;
  }

  function mint(address recipient) external _onlyMinterOrOwner {
    require(recipient != address(0), 'Cannot mint to zero address');
    require(_nextTokenId < _tokenIdMax, 'Max. supply reached');
    return _safeMint(recipient, _nextTokenId++);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    _requireOwned(tokenId);
    return string(abi.encodePacked(baseURI, getTokenVersion(tokenId), '/', Strings.toString(tokenId)));
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
    versions = new string[](_nextTokenId - 1);
    for (uint i = 0; i < versions.length; i++) {
      versions[i] = getTokenVersion(i + 1);
    }
  }

  function _updateTokenVersion(uint256 tokenId) internal {
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

  function setMinterContractAddress(address minterContractAddress) public _onlyOwner {
    _minterContractAddress = minterContractAddress;
  }

  function setBaseURI(string memory newBaseURI) public _onlyOwner {
    baseURI = newBaseURI;
  }

  function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
    _updateTokenVersion(tokenId);

    super.transferFrom(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
