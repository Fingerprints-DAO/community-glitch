import dayjs from 'dayjs'
import { formatEther } from 'ethers'
import { AuctionConfig } from 'types/auction'
import {
  readAuctionGetTopBids,
  readAuctionTopBids,
  useReadAuctionGetTopBids,
} from 'web3/contract-functions'

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
