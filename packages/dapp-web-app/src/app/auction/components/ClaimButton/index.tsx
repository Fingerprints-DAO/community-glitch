'use client'
import { Button, Text } from '@chakra-ui/react'
import { EtherSymbol } from 'components/EtherSymbol'
import { useMemo } from 'react'
import { formatToEtherStringBN } from 'utils/price'
import { pluralize } from 'utils/string'
import { useAccount } from 'wagmi'
import {
  useReadAuctionBidBalances,
  useReadAuctionClaimed,
  useReadAuctionGetSettledPrice,
  useWriteAuctionClaimAll,
} from 'web3/contract-functions'

export type ClaimButtonType = {
  nftsToClaim?: number
  bidSpended?: bigint
}

export const ClaimButton = ({
  nftsToClaim = 0,
  bidSpended = 0n,
}: ClaimButtonType) => {
  const { address: userAddress } = useAccount()
  const { data: balance = 0n } = useReadAuctionBidBalances({
    args: [userAddress!],
  })
  const { data: alreadyClaimed } = useReadAuctionClaimed({
    args: [userAddress!],
  })
  const { writeContract } = useWriteAuctionClaimAll()
  const { data: settledPrice = 0n } = useReadAuctionGetSettledPrice()
  const refundToClaim = useMemo(() => {
    if (nftsToClaim < 1) return 0n
    const baseCosts = BigInt(nftsToClaim) * settledPrice
    return bidSpended - baseCosts
  }, [bidSpended, nftsToClaim, settledPrice])
  const isAbleToClaim = nftsToClaim > 0 || balance > 0

  const onClick = () => {
    console.log('claim')
    writeContract({})
  }

  if (!isAbleToClaim) return null

  return (
    <>
      <Button w={'full'} isDisabled={alreadyClaimed} onClick={onClick}>
        {alreadyClaimed ? 'claimed' : 'claim all'}
      </Button>
      {!alreadyClaimed && (
        <Text textAlign={'center'} fontSize={'xs'} mt={1}>
          {pluralize(nftsToClaim, 'art', 'arts')} and <EtherSymbol />
          {formatToEtherStringBN(balance + refundToClaim)} to refund
        </Text>
      )}
    </>
  )
}
