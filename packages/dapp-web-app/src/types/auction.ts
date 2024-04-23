import { GetFilterLogsReturnType } from 'viem/actions'

export enum SalesState {
  IDLE,
  NOT_STARTED,
  STARTED,
  ENDED,
  SOLD_OUT,
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
