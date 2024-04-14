import dayjs from 'dayjs'
import { formatEther } from 'ethers'
import { AuctionConfig, BidLogsType } from 'types/auction'
import { readAuctionGetTopBids } from 'web3/contract-functions'
import { getBurnedTokens } from 'web3/logs'

export const handleAuctionConfig = (config: AuctionConfig) => {
  return {
    startTime: Number(config.startTime),
    endTime: Number(config.endTime),
    minBidIncrementInWei: Number(formatEther(config.minBidIncrementInWei)),
    startAmountInWei: Number(formatEther(config.startAmountInWei)),
  }
}

export type HandledAuctionConfig = ReturnType<typeof handleAuctionConfig>

export const defaultAuctionConfig: ReturnType<typeof handleAuctionConfig> = {
  startTime: dayjs().valueOf(),
  endTime: dayjs().valueOf(),
  minBidIncrementInWei: 0,
  startAmountInWei: 0,
}

export const handleAuctionConfigToDayJs = (config: HandledAuctionConfig) => {
  return {
    ...config,
    startTime: dayjs.unix(config.startTime),
    endTime: dayjs.unix(config.endTime),
  }
}
export type HandledAuctionConfigToDayJs = ReturnType<
  typeof handleAuctionConfigToDayJs
>

export const defaultAuctionConfigDayJs: ReturnType<
  typeof handleAuctionConfigToDayJs
> = {
  startTime: dayjs(),
  endTime: dayjs(),
  minBidIncrementInWei: 0,
  startAmountInWei: 0,
}

export type ReadAuctionGetTopBidsResult =
  | Awaited<ReturnType<typeof readAuctionGetTopBids>>
  | []

export const cleanEmptyBids = (bids: ReadAuctionGetTopBidsResult = []) => {
  return bids.filter((bid) => bid.amount > 0n)
}

export const filterMyBids = (
  myAddress?: string,
  bids: ReturnType<typeof cleanEmptyBids> = [],
) => {
  if (!myAddress) return []
  return bids
    .map((bid, index) => ({ ...bid, index: index + 1 }))
    .filter((bid) => bid.bidder.toLowerCase() === myAddress.toLowerCase())
}

export const orderBidsByAmount = (bids: BidLogsType = []) => {
  return bids.sort((a, b) => Number(b.args.amount) - Number(a.args.amount))
}

export const handleBurnedTokens = (
  eventResponse: Awaited<ReturnType<typeof getBurnedTokens>>,
) => {
  if (!eventResponse || eventResponse.length < 1) return []

  return eventResponse.reduce((acc: number[], event) => {
    if (!event.args.tokenId) return acc
    const tokenId = Number(event.args.tokenId)
    if (acc.includes(tokenId)) return acc
    return [...acc, tokenId]
  }, [])
}
