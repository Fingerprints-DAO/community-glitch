'use client'
import { Button, Text } from '@chakra-ui/react'
import { EtherSymbol } from 'components/EtherSymbol'
import useTxToast from 'hooks/use-tx-toast'
import { useEffect, useMemo } from 'react'
import { formatToEtherStringBN } from 'utils/price'
import { pluralize } from 'utils/string'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
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
  const { data: alreadyClaimed, refetch: refetchClaimed } =
    useReadAuctionClaimed({
      args: [userAddress!],
    })
  const claimAll = useWriteAuctionClaimAll()
  const { data: settledPrice = 0n } = useReadAuctionGetSettledPrice()
  const { showTxSentToast, showTxErrorToast, showTxExecutedToast } =
    useTxToast()
  const claimAllTx = useWaitForTransactionReceipt({
    hash: claimAll?.data,
  })
  const refundToClaim = useMemo(() => {
    if (nftsToClaim < 1) return 0n
    const baseCosts = BigInt(nftsToClaim) * settledPrice
    return bidSpended - baseCosts
  }, [bidSpended, nftsToClaim, settledPrice])
  const isAbleToClaim = nftsToClaim > 0 || balance > 0

  const onClick = () => {
    claimAll.writeContract(
      {
        args: [userAddress!],
      },
      {
        onSuccess: (data) => {
          showTxSentToast('claim-sent', data)
        },
        onError: (error) => {
          showTxErrorToast(error ?? `Tx could not be sent`)
        },
      },
    )
  }

  useEffect(() => {
    if (claimAll.data && claimAllTx.isSuccess) {
      showTxExecutedToast({ id: 'claim-executed', txHash: claimAll.data })
      claimAll.reset()
      refetchClaimed()
    }
    if (claimAll.data && claimAllTx.isError)
      showTxErrorToast(claimAllTx?.failureReason ?? `Tx failed`)
  }, [
    claimAll,
    claimAllTx?.failureReason,
    claimAllTx.isError,
    claimAllTx.isSuccess,
    refetchClaimed,
    showTxErrorToast,
    showTxExecutedToast,
  ])

  if (!isAbleToClaim)
    return (
      <Text fontSize={'xs'} mt={1}>
        No arts or ether to claim. Try another account.
      </Text>
    )

  return (
    <>
      <Button
        w={'full'}
        isDisabled={alreadyClaimed || claimAll.isPending}
        isLoading={claimAll.isPending}
        onClick={onClick}
      >
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
