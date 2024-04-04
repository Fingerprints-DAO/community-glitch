'use client'
import { Button, Text } from '@chakra-ui/react'
import { EtherSymbol } from 'components/EtherSymbol'
import { formatToEtherStringBN } from 'utils/price'
import { pluralize } from 'utils/string'
import { useAccount } from 'wagmi'
import {
  useReadAuctionBidBalances,
  useReadAuctionClaimed,
  useWriteAuctionClaimAll,
} from 'web3/contract-functions'

export type ClaimButtonType = {
  nftsToClaim?: number
}

export const ClaimButton = ({ nftsToClaim = 0 }: ClaimButtonType) => {
  const { address: userAddress } = useAccount()
  const { data: balance } = useReadAuctionBidBalances({ args: [userAddress!] })
  const { data: alreadyClaimed } = useReadAuctionClaimed({
    args: [userAddress!],
  })
  const { writeContract } = useWriteAuctionClaimAll()

  const onClick = () => {
    console.log('claim')
    writeContract({})
  }

  return (
    <>
      <Button w={'full'} isDisabled={alreadyClaimed} onClick={onClick}>
        {alreadyClaimed ? 'claimed' : 'claim all'}
      </Button>
      {!alreadyClaimed && nftsToClaim > 0 && balance && (
        <Text textAlign={'center'} fontSize={'xs'} mt={1}>
          {pluralize(nftsToClaim, 'art', 'arts')} and <EtherSymbol />
          {formatToEtherStringBN(balance)}
        </Text>
      )}
    </>
  )
}
