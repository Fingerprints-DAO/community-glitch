import { GetFilterLogsReturnType } from 'viem/actions'

export enum AuctionState {
  IDLE,
  NOT_STARTED,
  STARTED,
  ENDED,
}

export type AuctionConfig = {
  startTime: bigint
  endTime: bigint
  minBidIncrementInWei: bigint
  startAmountInWei: bigint
}

export type AuctionData = {
  currentPrice: bigint
  minted: bigint
  maxSupply: bigint
}

export type BidLogsType = (GetFilterLogsReturnType[0] & {
  args: { amount: bigint; bidder: string }
})[]
