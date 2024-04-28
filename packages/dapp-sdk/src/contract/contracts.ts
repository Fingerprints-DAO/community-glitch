import {
  GlitchABI,
  GlitchAuctionABI,
  GlitchyGridGridABI,
} from '@dapp/contracts'
import { getContractAddressesForChainOrThrow } from './addresses'

export const getContractsDataForChainOrThrow = async (chainId: number) => {
  const addresses = await getContractAddressesForChainOrThrow(chainId)
  return {
    GlitchABI: {
      abi: GlitchABI,
      address: addresses.Glitch,
    },
    GlitchAuctionABI: {
      abi: GlitchAuctionABI,
      address: addresses.GlitchAuction,
    },
    GlitchyGridGridABI: {
      abi: GlitchyGridGridABI,
      address: addresses.GlitchyGridGrid,
    },
  }
}
