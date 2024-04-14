import { handleAuctionConfig } from 'app/one-one-auction/data-handler'
import { wagmiConfig } from 'settings/wagmiConfig'
import { readAuctionGetConfig } from 'web3/contract-functions'

const prodConfig = {
  startTime: 1714064400,
  endTime: 1714323600,
  minBidIncrementInWei: 0.005,
  startAmountInWei: 0.06,
}

export async function GET() {
  let auctionConfig = {}
  try {
    auctionConfig = handleAuctionConfig(
      await readAuctionGetConfig(wagmiConfig, {}),
    )
  } catch (e) {
    console.error('Error getting auction config', e)
    if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'mainnet') {
      auctionConfig = prodConfig
    } else {
      return new Response('Internal Server Error', { status: 500 })
    }
  }

  return Response.json({ ...auctionConfig })
}

export const revalidate = 1
