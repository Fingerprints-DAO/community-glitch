import { getContractAddressesForChainOrThrow } from '@dapp/sdk'
import { getPublicClient } from '@wagmi/core'
import { wagmiConfig } from 'settings/wagmiConfig'
import { getChainId } from 'utils/chain'
import { glitchConfig } from 'web3/contract-functions'

const client = getPublicClient(wagmiConfig as any)
const auctionContract = getContractAddressesForChainOrThrow(getChainId())

export async function getBurnedTokens() {
  if (!client) return
  const filter = await client.createContractEventFilter({
    ...glitchConfig,
    eventName: 'Burned',
    fromBlock: BigInt(auctionContract.startBlock),
  })
  const logs = await client.getFilterLogs({ filter })
  return logs
}
