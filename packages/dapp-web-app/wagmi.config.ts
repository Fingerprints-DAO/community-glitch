import 'dotenv/config'
import { defineConfig } from '@wagmi/cli'
import { actions, react } from '@wagmi/cli/plugins'
import contracts from '@dapp/sdk'
import { getChainId } from './src/utils/chain'
import { Address } from 'viem'

export default defineConfig({
  out: 'src/web3/contract-functions.ts',
  contracts: [
    {
      name: 'glitch',
      abi: contracts.GlitchABI as any,
      address: contracts.getContractAddressesForChainOrThrow(getChainId())
        .Glitch as Address,
    },
    {
      name: 'auction',
      abi: contracts.GlitchAuctionABI as any,
      address: contracts.getContractAddressesForChainOrThrow(getChainId())
        .GlitchAuction as Address,
    },
  ],
  plugins: [react(), actions()],
})
