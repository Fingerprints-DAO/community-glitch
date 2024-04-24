import { handleAuctionConfig } from 'app/one-one-auction/data-handler'
import { wagmiConfig } from 'settings/wagmiConfig'
import { readAuctionGetConfig } from 'web3/contract-functions'

export async function GET() {
  let auctionConfig = {
    startTime: 1714064400,
    endTime: 1714323600,
    minBidIncrementInWei: 0.005,
    startAmountInWei: 0.04,
  }

  try {
    auctionConfig = handleAuctionConfig(
      await readAuctionGetConfig(wagmiConfig, {}),
    )
  } catch (e) {
    console.error('Error getting auction config', e)
  }

  return Response.json({ ...auctionConfig })
}

export const revalidate = 1
