import { handleBurnedTokens } from 'app/one-one-auction/data-handler'
import { getBurnedTokens } from 'web3/logs'

export async function GET() {
  // TODO: remove to mainnet
  // let tokens = []

  // try {
  //   tokens = handleBurnedTokens(await getBurnedTokens())
  // } catch (e) {
  //   console.error('Error getting burned tokens', e)
  //   return new Response('Internal Server Error', { status: 500 })
  // }

  return Response.json([])
}

export const revalidate = 1
