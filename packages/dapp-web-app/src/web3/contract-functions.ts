import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// auction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const auctionAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_initialOwner', internalType: 'address', type: 'address' },
      { name: '_glitchAddress', internalType: 'address', type: 'address' },
      { name: '_treasuryWallet', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOP_BIDS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_recipient', internalType: 'address', type: 'address' }],
    name: 'adminMintRemaining',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_bidAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'bid',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bidder', internalType: 'address', type: 'address' }],
    name: 'bidBalances',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkMerkleProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: '_to', internalType: 'address', type: 'address' }],
    name: 'claimAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bidder', internalType: 'address', type: 'address' }],
    name: 'claimed',
    outputs: [{ name: 'isClaimed', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'firstTierMerkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_to', internalType: 'address', type: 'address' }],
    name: 'forceRefund',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        name: '',
        internalType: 'struct GlitchAuction.Config',
        type: 'tuple',
        components: [
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minBidIncrementInWei',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'startAmountInWei',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumBid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSettledPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_discountType',
        internalType: 'enum GlitchAuction.DiscountType',
        type: 'uint8',
      },
    ],
    name: 'getSettledPriceWithDiscount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTopBids',
    outputs: [
      {
        name: '',
        internalType: 'struct GlitchAuction.Bid[50]',
        type: 'tuple[50]',
        components: [
          { name: 'bidder', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'discountType',
            internalType: 'enum GlitchAuction.DiscountType',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'glitchAddress',
    outputs: [{ name: '', internalType: 'contract IGlitch', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
      { name: '_endTime', internalType: 'uint256', type: 'uint256' },
      {
        name: '_minBidIncrementInWei',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_startAmountInWei', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_glitchAddress', internalType: 'address', type: 'address' },
    ],
    name: 'setGlitchAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_firstTierRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setMerkleRoots',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newWallet', internalType: 'address', type: 'address' }],
    name: 'setTreasuryWallet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'topBids',
    outputs: [
      { name: 'bidder', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'discountType',
        internalType: 'enum GlitchAuction.DiscountType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasuryWallet',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawn',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'nftAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'refundAmount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Claimed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'lastBidPosition',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Outbidded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'AlreadyClaimed' },
  { type: 'error', inputs: [], name: 'AuctionNotEnded' },
  { type: 'error', inputs: [], name: 'BidDoesNotQualifyForTopBids' },
  { type: 'error', inputs: [], name: 'BidTooLow' },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'EnforcedPause' },
  { type: 'error', inputs: [], name: 'ExpectedPause' },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'InsufficientFundsForBid' },
  { type: 'error', inputs: [], name: 'InvalidAddress' },
  { type: 'error', inputs: [], name: 'InvalidAmountInWei' },
  { type: 'error', inputs: [], name: 'InvalidMinBidIncrementValue' },
  {
    type: 'error',
    inputs: [
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidStartEndTime',
  },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'TransferFailed' },
] as const

export const auctionAddress =
  '0x0d7848e6245C802Ca5d3F1c270dB360896D594cF' as const

export const auctionConfig = {
  address: auctionAddress,
  abi: auctionAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// glitch
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const glitchAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      {
        name: '_minterContractAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: '_baseUri', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: '_ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'adminMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_givenCode', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnToReedem',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fundsReceiverAddress',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllTokensVersion',
    outputs: [{ name: 'versions', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenVersion',
    outputs: [{ name: 'versionStr', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'getTokensByOwner',
    outputs: [
      { name: 'tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: '_id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minterContractAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'refreshToken',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'refreshTokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newBaseURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newFundsReceiverAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setFundsReceiverAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newMinterContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setMinterContractAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newRefreshTokenPriceInWei',
        internalType: 'uint256',
        type: 'uint256',
      },
    ],
    name: 'setRefreshTokenPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'givenCode',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Burned',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'recipient',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Minted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'refresherAddress',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'TokenRefreshed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'IdOutOfBounds' },
  { type: 'error', inputs: [], name: 'InvalidPrice' },
  { type: 'error', inputs: [], name: 'NotEnoughETH' },
  { type: 'error', inputs: [], name: 'OnlyMinter' },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  { type: 'error', inputs: [], name: 'OnlyTokenOwner' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
] as const

export const glitchAddress =
  '0xAa39B261b8d4FDaa8A1ED436cC14A723c0480eE9' as const

export const glitchConfig = { address: glitchAddress, abi: glitchAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// glitchy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const glitchyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: '_baseUri', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DISCOUNT_PERCENTAGE',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FREE_CLAIM_AMOUNT',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_SUPPLY',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_amount', internalType: 'uint8', type: 'uint8' },
      { name: '_isDiscounted', internalType: 'bool', type: 'bool' },
    ],
    name: 'calculatePrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_address', internalType: 'address', type: 'address' },
    ],
    name: 'checkDiscountMerkleProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'checkFreeClaimAllowlist',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint8', type: 'uint8' },
      { name: 'proof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fundsReceiverAddress',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        name: '',
        internalType: 'struct GlitchyGridGrid.Config',
        type: 'tuple',
        components: [
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint8', type: 'uint8' },
      { name: '_merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'ownerMint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newBaseURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
      { name: '_endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_allowlistRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setDiscountAllowlistRoot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_allowlistRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setFreeClaimAllowlistRoot',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newFundsReceiverAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setFundsReceiverAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenPrice', internalType: 'uint256', type: 'uint256' }],
    name: 'setTokenPrice',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'tokenPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'FreeClaimedExceeded' },
  { type: 'error', inputs: [], name: 'InsufficientFunds' },
  { type: 'error', inputs: [], name: 'InvalidProof' },
  {
    type: 'error',
    inputs: [
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidStartEndTime',
  },
  { type: 'error', inputs: [], name: 'MaxNumberOfMintedTokensExceeded' },
  { type: 'error', inputs: [], name: 'MaxSupplyExceeded' },
  { type: 'error', inputs: [], name: 'OnlyMinter' },
  { type: 'error', inputs: [], name: 'OnlyOwner' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'RegularMintedExceeded' },
  { type: 'error', inputs: [], name: 'ZeroAddress' },
] as const

export const glitchyAddress =
  '0x0d7848e6245C802Ca5d3F1c270dB360896D594cF' as const

export const glitchyConfig = {
  address: glitchyAddress,
  abi: glitchyAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const useReadAuction = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"MAX_TOP_BIDS"`
 */
export const useReadAuctionMaxTopBids = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'MAX_TOP_BIDS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bidBalances"`
 */
export const useReadAuctionBidBalances = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bidBalances',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"checkMerkleProof"`
 */
export const useReadAuctionCheckMerkleProof =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'checkMerkleProof',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimed"`
 */
export const useReadAuctionClaimed = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"firstTierMerkleRoot"`
 */
export const useReadAuctionFirstTierMerkleRoot =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'firstTierMerkleRoot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getConfig"`
 */
export const useReadAuctionGetConfig = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getConfig',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getMinimumBid"`
 */
export const useReadAuctionGetMinimumBid = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getMinimumBid',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPrice"`
 */
export const useReadAuctionGetSettledPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'getSettledPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPriceWithDiscount"`
 */
export const useReadAuctionGetSettledPriceWithDiscount =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'getSettledPriceWithDiscount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getTopBids"`
 */
export const useReadAuctionGetTopBids = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getTopBids',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"glitchAddress"`
 */
export const useReadAuctionGlitchAddress = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'glitchAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAuctionOwner = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"paused"`
 */
export const useReadAuctionPaused = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"topBids"`
 */
export const useReadAuctionTopBids = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'topBids',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"treasuryWallet"`
 */
export const useReadAuctionTreasuryWallet = /*#__PURE__*/ createUseReadContract(
  { abi: auctionAbi, address: auctionAddress, functionName: 'treasuryWallet' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdrawn"`
 */
export const useReadAuctionWithdrawn = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdrawn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const useWriteAuction = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const useWriteAuctionAdminMintRemaining =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const useWriteAuctionBid = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const useWriteAuctionClaimAll = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"forceRefund"`
 */
export const useWriteAuctionForceRefund = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'forceRefund',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteAuctionPause = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAuctionRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteAuctionSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setGlitchAddress"`
 */
export const useWriteAuctionSetGlitchAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setGlitchAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const useWriteAuctionSetMerkleRoots =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setMerkleRoots',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const useWriteAuctionSetTreasuryWallet =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAuctionTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteAuctionUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteAuctionWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const useSimulateAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const useSimulateAuctionAdminMintRemaining =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const useSimulateAuctionBid = /*#__PURE__*/ createUseSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const useSimulateAuctionClaimAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'claimAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"forceRefund"`
 */
export const useSimulateAuctionForceRefund =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'forceRefund',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateAuctionPause = /*#__PURE__*/ createUseSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAuctionRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateAuctionSetConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setGlitchAddress"`
 */
export const useSimulateAuctionSetGlitchAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setGlitchAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const useSimulateAuctionSetMerkleRoots =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setMerkleRoots',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const useSimulateAuctionSetTreasuryWallet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAuctionTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateAuctionUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateAuctionWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__
 */
export const useWatchAuctionEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"BidPlaced"`
 */
export const useWatchAuctionBidPlacedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'BidPlaced',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Claimed"`
 */
export const useWatchAuctionClaimedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'Claimed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Outbidded"`
 */
export const useWatchAuctionOutbiddedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'Outbidded',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAuctionOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchAuctionPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchAuctionUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const useReadGlitch = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadGlitchBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"fundsReceiverAddress"`
 */
export const useReadGlitchFundsReceiverAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'fundsReceiverAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getAllTokensVersion"`
 */
export const useReadGlitchGetAllTokensVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'getAllTokensVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadGlitchGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getTokenVersion"`
 */
export const useReadGlitchGetTokenVersion = /*#__PURE__*/ createUseReadContract(
  { abi: glitchAbi, address: glitchAddress, functionName: 'getTokenVersion' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getTokensByOwner"`
 */
export const useReadGlitchGetTokensByOwner =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'getTokensByOwner',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadGlitchIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"minterContractAddress"`
 */
export const useReadGlitchMinterContractAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'minterContractAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"name"`
 */
export const useReadGlitchName = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGlitchOwner = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadGlitchOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshTokenPrice"`
 */
export const useReadGlitchRefreshTokenPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'refreshTokenPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadGlitchSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadGlitchSymbol = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadGlitchTokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadGlitchTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadGlitchTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadGlitchTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const useWriteGlitch = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"adminMint"`
 */
export const useWriteGlitchAdminMint = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'adminMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteGlitchApprove = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burnToReedem"`
 */
export const useWriteGlitchBurnToReedem = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burnToReedem',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteGlitchMint = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const useWriteGlitchRefreshToken = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteGlitchRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteGlitchSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteGlitchSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteGlitchSetBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const useWriteGlitchSetFundsReceiverAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const useWriteGlitchSetMinterContractAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setRefreshTokenPrice"`
 */
export const useWriteGlitchSetRefreshTokenPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setRefreshTokenPrice',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteGlitchTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGlitchTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const useSimulateGlitch = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"adminMint"`
 */
export const useSimulateGlitchAdminMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'adminMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateGlitchApprove = /*#__PURE__*/ createUseSimulateContract(
  { abi: glitchAbi, address: glitchAddress, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burnToReedem"`
 */
export const useSimulateGlitchBurnToReedem =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'burnToReedem',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateGlitchMint = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const useSimulateGlitchRefreshToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'refreshToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateGlitchRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateGlitchSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateGlitchSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateGlitchSetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const useSimulateGlitchSetFundsReceiverAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const useSimulateGlitchSetMinterContractAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setRefreshTokenPrice"`
 */
export const useSimulateGlitchSetRefreshTokenPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setRefreshTokenPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateGlitchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGlitchTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__
 */
export const useWatchGlitchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchGlitchApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchGlitchApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchGlitchBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Burned"`
 */
export const useWatchGlitchBurnedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'Burned',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchGlitchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Minted"`
 */
export const useWatchGlitchMintedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'Minted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGlitchOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"TokenRefreshed"`
 */
export const useWatchGlitchTokenRefreshedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'TokenRefreshed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchGlitchTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__
 */
export const useReadGlitchy = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"DISCOUNT_PERCENTAGE"`
 */
export const useReadGlitchyDiscountPercentage =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'DISCOUNT_PERCENTAGE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"FREE_CLAIM_AMOUNT"`
 */
export const useReadGlitchyFreeClaimAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'FREE_CLAIM_AMOUNT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 */
export const useReadGlitchyMaxSupply = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadGlitchyBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"calculatePrice"`
 */
export const useReadGlitchyCalculatePrice = /*#__PURE__*/ createUseReadContract(
  { abi: glitchyAbi, address: glitchyAddress, functionName: 'calculatePrice' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"checkDiscountMerkleProof"`
 */
export const useReadGlitchyCheckDiscountMerkleProof =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'checkDiscountMerkleProof',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"checkFreeClaimAllowlist"`
 */
export const useReadGlitchyCheckFreeClaimAllowlist =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'checkFreeClaimAllowlist',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"fundsReceiverAddress"`
 */
export const useReadGlitchyFundsReceiverAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'fundsReceiverAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadGlitchyGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"getConfig"`
 */
export const useReadGlitchyGetConfig = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'getConfig',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadGlitchyIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"name"`
 */
export const useReadGlitchyName = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGlitchyOwner = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadGlitchyOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadGlitchySupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadGlitchySymbol = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadGlitchyTokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadGlitchyTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenPrice"`
 */
export const useReadGlitchyTokenPrice = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenPrice',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadGlitchyTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadGlitchyTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__
 */
export const useWriteGlitchy = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteGlitchyApprove = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"claim"`
 */
export const useWriteGlitchyClaim = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteGlitchyMint = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"ownerMint"`
 */
export const useWriteGlitchyOwnerMint = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'ownerMint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteGlitchyRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteGlitchySafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteGlitchySetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteGlitchySetBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteGlitchySetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setDiscountAllowlistRoot"`
 */
export const useWriteGlitchySetDiscountAllowlistRoot =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setDiscountAllowlistRoot',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFreeClaimAllowlistRoot"`
 */
export const useWriteGlitchySetFreeClaimAllowlistRoot =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFreeClaimAllowlistRoot',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const useWriteGlitchySetFundsReceiverAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setTokenPrice"`
 */
export const useWriteGlitchySetTokenPrice =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setTokenPrice',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteGlitchyTransferFrom = /*#__PURE__*/ createUseWriteContract(
  { abi: glitchyAbi, address: glitchyAddress, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGlitchyTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteGlitchyWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__
 */
export const useSimulateGlitchy = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateGlitchyApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"claim"`
 */
export const useSimulateGlitchyClaim = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateGlitchyMint = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"ownerMint"`
 */
export const useSimulateGlitchyOwnerMint =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'ownerMint',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateGlitchyRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateGlitchySafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateGlitchySetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateGlitchySetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateGlitchySetConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setDiscountAllowlistRoot"`
 */
export const useSimulateGlitchySetDiscountAllowlistRoot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setDiscountAllowlistRoot',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFreeClaimAllowlistRoot"`
 */
export const useSimulateGlitchySetFreeClaimAllowlistRoot =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFreeClaimAllowlistRoot',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const useSimulateGlitchySetFundsReceiverAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setTokenPrice"`
 */
export const useSimulateGlitchySetTokenPrice =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setTokenPrice',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateGlitchyTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGlitchyTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateGlitchyWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__
 */
export const useWatchGlitchyEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchGlitchyApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchGlitchyApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchGlitchyBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchGlitchyMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGlitchyOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchGlitchyTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'Transfer',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const readAuction = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"MAX_TOP_BIDS"`
 */
export const readAuctionMaxTopBids = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'MAX_TOP_BIDS',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bidBalances"`
 */
export const readAuctionBidBalances = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bidBalances',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"checkMerkleProof"`
 */
export const readAuctionCheckMerkleProof = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'checkMerkleProof',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimed"`
 */
export const readAuctionClaimed = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimed',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"firstTierMerkleRoot"`
 */
export const readAuctionFirstTierMerkleRoot = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'firstTierMerkleRoot',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getConfig"`
 */
export const readAuctionGetConfig = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getConfig',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getMinimumBid"`
 */
export const readAuctionGetMinimumBid = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getMinimumBid',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPrice"`
 */
export const readAuctionGetSettledPrice = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getSettledPrice',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPriceWithDiscount"`
 */
export const readAuctionGetSettledPriceWithDiscount =
  /*#__PURE__*/ createReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'getSettledPriceWithDiscount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getTopBids"`
 */
export const readAuctionGetTopBids = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getTopBids',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"glitchAddress"`
 */
export const readAuctionGlitchAddress = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'glitchAddress',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"owner"`
 */
export const readAuctionOwner = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"paused"`
 */
export const readAuctionPaused = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'paused',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"topBids"`
 */
export const readAuctionTopBids = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'topBids',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"treasuryWallet"`
 */
export const readAuctionTreasuryWallet = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'treasuryWallet',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdrawn"`
 */
export const readAuctionWithdrawn = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdrawn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const writeAuction = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const writeAuctionAdminMintRemaining = /*#__PURE__*/ createWriteContract(
  {
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const writeAuctionBid = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const writeAuctionClaimAll = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"forceRefund"`
 */
export const writeAuctionForceRefund = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'forceRefund',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"pause"`
 */
export const writeAuctionPause = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeAuctionRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const writeAuctionSetConfig = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setGlitchAddress"`
 */
export const writeAuctionSetGlitchAddress = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setGlitchAddress',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const writeAuctionSetMerkleRoots = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setMerkleRoots',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const writeAuctionSetTreasuryWallet = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setTreasuryWallet',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeAuctionTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"unpause"`
 */
export const writeAuctionUnpause = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeAuctionWithdraw = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const simulateAuction = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const simulateAuctionAdminMintRemaining =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const simulateAuctionBid = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const simulateAuctionClaimAll = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"forceRefund"`
 */
export const simulateAuctionForceRefund = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'forceRefund',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"pause"`
 */
export const simulateAuctionPause = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'pause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateAuctionRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const simulateAuctionSetConfig = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setGlitchAddress"`
 */
export const simulateAuctionSetGlitchAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setGlitchAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const simulateAuctionSetMerkleRoots =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setMerkleRoots',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const simulateAuctionSetTreasuryWallet =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateAuctionTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"unpause"`
 */
export const simulateAuctionUnpause = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'unpause',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateAuctionWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__
 */
export const watchAuctionEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"BidPlaced"`
 */
export const watchAuctionBidPlacedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'BidPlaced',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Claimed"`
 */
export const watchAuctionClaimedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: auctionAbi,
  address: auctionAddress,
  eventName: 'Claimed',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Outbidded"`
 */
export const watchAuctionOutbiddedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'Outbidded',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchAuctionOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Paused"`
 */
export const watchAuctionPausedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: auctionAbi,
  address: auctionAddress,
  eventName: 'Paused',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"Unpaused"`
 */
export const watchAuctionUnpausedEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: auctionAbi, address: auctionAddress, eventName: 'Unpaused' },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const readGlitch = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readGlitchBalanceOf = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"fundsReceiverAddress"`
 */
export const readGlitchFundsReceiverAddress = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'fundsReceiverAddress',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getAllTokensVersion"`
 */
export const readGlitchGetAllTokensVersion = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getAllTokensVersion',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getApproved"`
 */
export const readGlitchGetApproved = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getTokenVersion"`
 */
export const readGlitchGetTokenVersion = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getTokenVersion',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getTokensByOwner"`
 */
export const readGlitchGetTokensByOwner = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getTokensByOwner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readGlitchIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"minterContractAddress"`
 */
export const readGlitchMinterContractAddress = /*#__PURE__*/ createReadContract(
  {
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'minterContractAddress',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"name"`
 */
export const readGlitchName = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"owner"`
 */
export const readGlitchOwner = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readGlitchOwnerOf = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshTokenPrice"`
 */
export const readGlitchRefreshTokenPrice = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshTokenPrice',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readGlitchSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"symbol"`
 */
export const readGlitchSymbol = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const readGlitchTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const readGlitchTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenOfOwnerByIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readGlitchTokenUri = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readGlitchTotalSupply = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const writeGlitch = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"adminMint"`
 */
export const writeGlitchAdminMint = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'adminMint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const writeGlitchApprove = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burnToReedem"`
 */
export const writeGlitchBurnToReedem = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burnToReedem',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const writeGlitchMint = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const writeGlitchRefreshToken = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshToken',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeGlitchRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeGlitchSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeGlitchSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const writeGlitchSetBaseUri = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const writeGlitchSetFundsReceiverAddress =
  /*#__PURE__*/ createWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const writeGlitchSetMinterContractAddress =
  /*#__PURE__*/ createWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setRefreshTokenPrice"`
 */
export const writeGlitchSetRefreshTokenPrice =
  /*#__PURE__*/ createWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setRefreshTokenPrice',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeGlitchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeGlitchTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const simulateGlitch = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"adminMint"`
 */
export const simulateGlitchAdminMint = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'adminMint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const simulateGlitchApprove = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burnToReedem"`
 */
export const simulateGlitchBurnToReedem = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burnToReedem',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const simulateGlitchMint = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const simulateGlitchRefreshToken = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshToken',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateGlitchRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateGlitchSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateGlitchSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const simulateGlitchSetBaseUri = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const simulateGlitchSetFundsReceiverAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const simulateGlitchSetMinterContractAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setRefreshTokenPrice"`
 */
export const simulateGlitchSetRefreshTokenPrice =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setRefreshTokenPrice',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateGlitchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateGlitchTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__
 */
export const watchGlitchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Approval"`
 */
export const watchGlitchApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchGlitchApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const watchGlitchBatchMetadataUpdateEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Burned"`
 */
export const watchGlitchBurnedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
  eventName: 'Burned',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const watchGlitchMetadataUpdateEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Minted"`
 */
export const watchGlitchMintedEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
  eventName: 'Minted',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchGlitchOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"TokenRefreshed"`
 */
export const watchGlitchTokenRefreshedEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'TokenRefreshed',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchGlitchTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
  eventName: 'Transfer',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__
 */
export const readGlitchy = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"DISCOUNT_PERCENTAGE"`
 */
export const readGlitchyDiscountPercentage = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'DISCOUNT_PERCENTAGE',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"FREE_CLAIM_AMOUNT"`
 */
export const readGlitchyFreeClaimAmount = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'FREE_CLAIM_AMOUNT',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"MAX_SUPPLY"`
 */
export const readGlitchyMaxSupply = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'MAX_SUPPLY',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readGlitchyBalanceOf = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"calculatePrice"`
 */
export const readGlitchyCalculatePrice = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'calculatePrice',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"checkDiscountMerkleProof"`
 */
export const readGlitchyCheckDiscountMerkleProof =
  /*#__PURE__*/ createReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'checkDiscountMerkleProof',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"checkFreeClaimAllowlist"`
 */
export const readGlitchyCheckFreeClaimAllowlist =
  /*#__PURE__*/ createReadContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'checkFreeClaimAllowlist',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"fundsReceiverAddress"`
 */
export const readGlitchyFundsReceiverAddress = /*#__PURE__*/ createReadContract(
  {
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'fundsReceiverAddress',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"getApproved"`
 */
export const readGlitchyGetApproved = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"getConfig"`
 */
export const readGlitchyGetConfig = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'getConfig',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readGlitchyIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"name"`
 */
export const readGlitchyName = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"owner"`
 */
export const readGlitchyOwner = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readGlitchyOwnerOf = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readGlitchySupportsInterface = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"symbol"`
 */
export const readGlitchySymbol = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const readGlitchyTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const readGlitchyTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenOfOwnerByIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenPrice"`
 */
export const readGlitchyTokenPrice = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenPrice',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readGlitchyTokenUri = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readGlitchyTotalSupply = /*#__PURE__*/ createReadContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__
 */
export const writeGlitchy = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"approve"`
 */
export const writeGlitchyApprove = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"claim"`
 */
export const writeGlitchyClaim = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"mint"`
 */
export const writeGlitchyMint = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"ownerMint"`
 */
export const writeGlitchyOwnerMint = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'ownerMint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeGlitchyRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeGlitchySafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeGlitchySetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const writeGlitchySetBaseUri = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setConfig"`
 */
export const writeGlitchySetConfig = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setDiscountAllowlistRoot"`
 */
export const writeGlitchySetDiscountAllowlistRoot =
  /*#__PURE__*/ createWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setDiscountAllowlistRoot',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFreeClaimAllowlistRoot"`
 */
export const writeGlitchySetFreeClaimAllowlistRoot =
  /*#__PURE__*/ createWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFreeClaimAllowlistRoot',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const writeGlitchySetFundsReceiverAddress =
  /*#__PURE__*/ createWriteContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setTokenPrice"`
 */
export const writeGlitchySetTokenPrice = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setTokenPrice',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeGlitchyTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeGlitchyTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeGlitchyWithdraw = /*#__PURE__*/ createWriteContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__
 */
export const simulateGlitchy = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"approve"`
 */
export const simulateGlitchyApprove = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"claim"`
 */
export const simulateGlitchyClaim = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'claim',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"mint"`
 */
export const simulateGlitchyMint = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"ownerMint"`
 */
export const simulateGlitchyOwnerMint = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'ownerMint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateGlitchyRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateGlitchySafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateGlitchySetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const simulateGlitchySetBaseUri = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setConfig"`
 */
export const simulateGlitchySetConfig = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setDiscountAllowlistRoot"`
 */
export const simulateGlitchySetDiscountAllowlistRoot =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setDiscountAllowlistRoot',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFreeClaimAllowlistRoot"`
 */
export const simulateGlitchySetFreeClaimAllowlistRoot =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFreeClaimAllowlistRoot',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setFundsReceiverAddress"`
 */
export const simulateGlitchySetFundsReceiverAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setFundsReceiverAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"setTokenPrice"`
 */
export const simulateGlitchySetTokenPrice =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'setTokenPrice',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateGlitchyTransferFrom = /*#__PURE__*/ createSimulateContract(
  { abi: glitchyAbi, address: glitchyAddress, functionName: 'transferFrom' },
)

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateGlitchyTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchyAbi,
    address: glitchyAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchyAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateGlitchyWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: glitchyAbi,
  address: glitchyAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__
 */
export const watchGlitchyEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchyAbi,
  address: glitchyAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"Approval"`
 */
export const watchGlitchyApprovalEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: glitchyAbi, address: glitchyAddress, eventName: 'Approval' },
)

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchGlitchyApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const watchGlitchyBatchMetadataUpdateEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const watchGlitchyMetadataUpdateEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchGlitchyOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchyAbi,
    address: glitchyAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchyAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchGlitchyTransferEvent = /*#__PURE__*/ createWatchContractEvent(
  { abi: glitchyAbi, address: glitchyAddress, eventName: 'Transfer' },
)
