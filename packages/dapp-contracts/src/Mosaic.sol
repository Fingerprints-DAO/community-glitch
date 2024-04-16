// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Address} from '@openzeppelin/contracts/utils/Address.sol';

/**
 * @title Mosaic
 * @dev ERC721 token contract representing a collection of digital artworks
 * @custom:security-contact arod.mail@proton.me
 */
contract Mosaic is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
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
   * @dev Error emmited when the maximum supply of tokens is exceeded.
   */
  error MaxSupplyExceeded();
  /**
   * @dev Error emitted when the maximum number of minted tokens is exceeded.
   */
  error MaxNumberOfMintedTokensExceeded();

  /**
   * @dev Error emitted when not enough funds are provided to mint the tokens.
   */
  error InsufficientFunds();

  // Events
  /**
   * @dev Event emitted when a new token is minted.
   * @param recipient The address of the token recipient.
   * @param tokenId The unique identifier of the minted token.
   */
  event Minted(address indexed recipient, uint256 indexed tokenId);

  uint256 private _nextTokenId;
  string private baseURI; /// @notice The base URI of the contract.
  uint16 private constant MAX_SUPPLY = 510; /// @notice The maximum number of tokens that can be minted.
  uint8 private constant MAX_NUMBER_PER_MINT = 10; /// @notice The maximum number of tokens that can be minted at once.
  uint256 public constant PRICE_PER_TOKEN = 0.025 ether; /// @notice The price of a refresh token.
  address payable public fundsReceiverAddress; /// @notice The address of the funds receiver.

  /**
   * @dev Constructor function
   * @param initialOwner The initial owner of the contract
   * @param _baseUri The base URI of the contract
   */
  constructor(
    address initialOwner,
    string memory _baseUri
  ) ERC721('mosaic text', 'MOSAIC') Ownable(initialOwner) {
    baseURI = _baseUri;
    fundsReceiverAddress = payable(initialOwner);
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
   * @param _amount The amount of tokens to mint
   */
  function mint(address recipient, uint8 _amount) external payable {
    if (msg.value < PRICE_PER_TOKEN * _amount) revert InsufficientFunds();

    _mintTokens(recipient, _amount);
  }

  /**
   * @dev Owner mints for free a new token and assigns it to the specified recipient
   * @param recipient The address to receive the minted token
   * @param _amount The amount of tokens to mint
   */
  function ownerMint(address recipient, uint8 _amount) external _onlyOwner {
    _mintTokens(recipient, _amount);
  }

  /**
   * @dev Internal function to mint tokens
   * @param recipient The address to receive the minted tokens
   * @param _amount The amount of tokens to mint
   */
  function _mintTokens(address recipient, uint8 _amount) internal {
    if (recipient == address(0)) revert ZeroAddress();
    if (_amount > MAX_NUMBER_PER_MINT) revert MaxNumberOfMintedTokensExceeded();

    uint256 tokenId = _nextTokenId + 1;
    if (tokenId > MAX_SUPPLY) revert MaxSupplyExceeded();

    for (uint8 i = 0; i < _amount; i++) {
      _mint(recipient, ++_nextTokenId);
    }
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
   * @dev Withdraws the contract balance to the funds receiver address
   * @dev Only the owner can call this function
   */
  function withdraw() external _onlyOwner {
    fundsReceiverAddress.sendValue(address(this).balance);
  }

  /**
   * @dev Returns the URI of a specific token
   * @param tokenId The ID of the token
   * @return The URI of the token
   */
  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    _requireOwned(tokenId);
    return string(abi.encodePacked(baseURI, Strings.toString(tokenId)));
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
