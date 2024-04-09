// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';
import {ERC721, IERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {ReentrancyGuard} from '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Address} from '@openzeppelin/contracts/utils/Address.sol';

/**
 * @title Glitch
 * @dev ERC721 token contract representing a collection of digital artworks
 * @custom:security-contact arod.mail@proton.me
 */
contract Glitch is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, ReentrancyGuard {
  using Address for address payable;

  // Errors
  /**
   * @dev Error emitted when the caller is not the current minter.
   */
  error OnlyMinter();
  /**
   * @dev Error emitted when the caller is not the current owner.
   */
  error OnlyOwner();
  /**
   * @dev Error emitted when the provided address is the zero address.
   */
  error ZeroAddress();
  /**
   * @dev Error emitted when the provided token ID is out of bounds.
   */
  error IdOutOfBounds();
  /**
   * @dev Error emitted when not enough Ether is provided for the transaction.
   */
  error NotEnoughETH();
  /**
   * @dev Error emitted when the provided price is invalid.
   */
  error InvalidPrice();
  /**
   * @dev Error emitted when the caller is not the token owner.
   */
  error OnlyTokenOwner();

  // Events
  /**
   * @dev Event emitted when a new token is minted.
   * @param recipient The address of the token recipient.
   * @param tokenId The unique identifier of the minted token.
   */
  event Minted(address indexed recipient, uint256 indexed tokenId);

  /**
   * @dev Event emitted when a token is burned.
   * @param tokenOwner The address of the token owner.
   * @param tokenId The unique identifier of the burned token.
   * @param givenCode The value of the token's metadata, as a `uint256` integer.
   */
  event Burned(address indexed tokenOwner, uint256 indexed tokenId, uint256 indexed givenCode);

  /**
   * @dev Event emitted when a token's metadata is refreshed.
   * @param tokenId The unique identifier of the refreshed token.
   * @param refresherAddress The address of the token refresher.
   */
  event TokenRefreshed(uint256 indexed tokenId, address refresherAddress);

  /**
   * @dev Enum representing the different token versions.
   */
  enum TokenVersion {
    A,
    B,
    C,
    D
  }

  uint16 private constant MAX_SUPPLY = 50; /// @notice The maximum number of tokens that can be minted.
  uint256 public refreshTokenPrice = 0.025 ether; /// @notice The price of a refresh token.
  address public minterContractAddress; /// @notice The address of the minter contract.
  address payable public fundsReceiverAddress; /// @notice The address of the funds receiver.
  string public baseURI; /// @notice The base URI of the contract.
  mapping(uint256 tokenId => TokenVersion version) private _tokenVersionMap; /// @notice The version of each token.

  /**
   * @dev Constructor function
   * @param initialOwner The initial owner of the contract
   * @param _minterContractAddress The address of the minter contract
   * @param _baseUri The base URI of the contract
   */
  constructor(address initialOwner, address _minterContractAddress, string memory _baseUri) ERC721('glitch', 'GLT') Ownable(initialOwner) {
    baseURI = _baseUri;
    minterContractAddress = _minterContractAddress;
    fundsReceiverAddress = payable(initialOwner);
  }

  /**
   * @dev Modifier to check if the caller is the minter contract or the owner
   */
  modifier _onlyMinter() {
    if (_msgSender() != minterContractAddress) revert OnlyMinter();
    _;
  }

  /**
   * @dev Modifier to check if the caller is the owner
   */
  modifier _onlyOwner() {
    if (_msgSender() != owner()) revert OnlyOwner();
    _;
  }

  /**
   * @dev Mints a new token and assigns it to the specified recipient
   * @param recipient The address to receive the minted token
   */
  function mint(address recipient, uint256 _id) external _onlyMinter {
    if (recipient == address(0)) revert ZeroAddress();
    if (_id > MAX_SUPPLY || _id == 0) revert IdOutOfBounds();
    emit Minted(recipient, _id);
    _safeMint(recipient, _id);
  }

  /**
   * @dev Updates the version of a specific token
   * @param tokenId The ID of the token
   */
  function _updateTokenVersion(uint256 tokenId) private {
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
    emit MetadataUpdate(tokenId);
  }

  /**
   * @dev Refreshes the version of a specific token
   * @param _tokenId The ID of the token
   */
  function refreshToken(uint256 _tokenId) external payable nonReentrant {
    if (msg.value < refreshTokenPrice) revert NotEnoughETH();

    _tokenVersionMap[_tokenId] = TokenVersion.A;
    emit MetadataUpdate(_tokenId);
    emit TokenRefreshed(_tokenId, _msgSender());

    fundsReceiverAddress.sendValue(msg.value);
  }

  /**
   * @dev Burns a token to reedem a physical piece of the art
   * @param _tokenId The ID of the token to burn
   * @param _givenCode The code given to the token
   */
  function burnToReedem(uint256 _tokenId, uint256 _givenCode) external {
    // must be the token owner
    if (_msgSender() != ownerOf(_tokenId)) revert OnlyTokenOwner();
    emit Burned(_msgSender(), _tokenId, _givenCode);
    _burn(_tokenId);
  }

  /**
   * @dev Sets the address of the minter contract
   * @param newMinterContractAddress The address of the minter contract
   * @dev Only the owner can call this function
   */
  function setMinterContractAddress(address newMinterContractAddress) external _onlyOwner {
    minterContractAddress = newMinterContractAddress;
  }

  /**
   * @dev Sets the base URI for token URIs
   * @param newBaseURI The new base URI
   * @dev Only the owner can call this function
   */
  function setBaseURI(string memory newBaseURI) external _onlyOwner {
    baseURI = newBaseURI;
  }

  /**
   * @dev Sets the address of the funds receiver
   * @param newFundsReceiverAddress The address of the funds receiver
   * @dev Only the owner can call this function
   */
  function setFundsReceiverAddress(address newFundsReceiverAddress) external _onlyOwner {
    if (newFundsReceiverAddress == address(0)) revert ZeroAddress();
    fundsReceiverAddress = payable(newFundsReceiverAddress);
  }

  /**
   * @dev Sets the price of the refresh token
   * @param newRefreshTokenPriceInWei The new price of the refresh token
   * @dev Only the owner can call this function
   */
  function setRefreshTokenPrice(uint256 newRefreshTokenPriceInWei) external _onlyOwner {
    if (newRefreshTokenPriceInWei == 0) revert InvalidPrice();
    refreshTokenPrice = newRefreshTokenPriceInWei;
  }

  /**
   * @dev Returns the version of a specific token
   * @param tokenId The ID of the token
   * @return versionStr The version of the token
   */
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

  /**
   * @dev Returns an array of versions for all tokens
   * @return versions An array of versions for all tokens
   */
  function getAllTokensVersion() external view returns (string[] memory versions) {
    versions = new string[](MAX_SUPPLY);
    for (uint256 i; i < MAX_SUPPLY; ) {
      // token id start on #1
      versions[i] = getTokenVersion(i + 1);
      unchecked {
        ++i;
      }
    }
  }
  /**
   * @dev Returns the URI of a specific token
   * @param tokenId The ID of the token
   * @return The URI of the token
   */
  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    _requireOwned(tokenId);
    return string(abi.encodePacked(baseURI, getTokenVersion(tokenId), '/', Strings.toString(tokenId)));
  }

  /**
   * @dev Transfers a token from one address to another
   * @param from The address to transfer the token from
   * @param to The address to transfer the token to
   * @param tokenId The ID of the token to transfer
   */
  function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
    _updateTokenVersion(tokenId);

    super.transferFrom(from, to, tokenId);
  }

  function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }

  /**
   * @dev Checks if a specific interface is supported by the contract
   * @param interfaceId The interface ID to check
   * @return True if the interface is supported, false otherwise
   */
  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
