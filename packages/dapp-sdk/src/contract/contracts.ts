import { glitchABI } from '@dapp/contracts'
import { getContractAddressesForChainOrThrow } from './addresses'

export const getContractsDataForChainOrThrow = async (chainId: number) => {
  const addresses = await getContractAddressesForChainOrThrow(chainId)
  return {
    Glitch: {
      abi: glitchABI,
      address: addresses.Glitch,
    },
  }
}
