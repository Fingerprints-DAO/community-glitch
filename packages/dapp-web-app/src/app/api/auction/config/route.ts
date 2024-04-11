import { handleAuctionConfig } from 'app/one-one-auction/data-handler'
import { wagmiConfig } from 'settings/wagmiConfig'
import { readAuctionGetConfig } from 'web3/contract-functions'

export async function GET() {
  let auctionConfig = {}
  try {
    auctionConfig = handleAuctionConfig(
      await readAuctionGetConfig(wagmiConfig, {}),
    )
  } catch (e) {
    console.error('Error getting auction config', e)
    return new Response('Internal Server Error', { status: 500 })
  }

  return Response.json({ ...auctionConfig })
}

export const revalidate = 60
