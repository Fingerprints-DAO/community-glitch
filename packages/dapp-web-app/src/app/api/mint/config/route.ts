import { handleMintConfig } from 'app/mint-edition/data-handler'
import { wagmiConfig } from 'settings/wagmiConfig'
import {
  readGlitchyGetConfig,
  readGlitchyTokenPrice,
} from 'web3/contract-functions'

export async function GET() {
  let mintConfig = {
    startTime: 1714323600,
    endTime: 1714967940,
    price: 0.025,
    priceWithDiscount: 0.02125,
  }

  try {
    const [config, price] = await Promise.all([
      readGlitchyGetConfig(wagmiConfig, {}),
      readGlitchyTokenPrice(wagmiConfig, {}),
    ])
    mintConfig = {
      ...handleMintConfig({
        ...config,
        price,
        priceWithDiscount: (price * 85n) / 100n,
      }),
    }
    console.log('Mint price fetched')
  } catch (e) {
    console.error('Error getting mint config', e)
  }

  return Response.json({ ...mintConfig })
}

export const revalidate = 1
