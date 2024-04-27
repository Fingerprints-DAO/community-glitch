import { Box, Button, Text } from '@chakra-ui/react'
import { useMintEditionContext } from 'contexts/MintEditionContext'
import { useClaimer } from 'hooks/use-claimer'
import useTxToast from 'hooks/use-tx-toast'
import { useEffect, useState } from 'react'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { useWriteGlitchyClaim } from 'web3/contract-functions'

interface ClaimSectionProps {}

const ClaimSection: React.FC<ClaimSectionProps> = ({}) => {
  const { refetchAll } = useMintEditionContext()
  const {
    qty,
    canClaim,
    isAvailableToClaim,
    merkleProof,
    isLoading,
    refetchClaimCheck,
  } = useClaimer()
  const { isConnected, address } = useAccount()
  const { showTxSentToast, showTxErrorToast, showTxExecutedToast } =
    useTxToast()
  const claim = useWriteGlitchyClaim()
  const claimTx = useWaitForTransactionReceipt({
    hash: claim?.data,
  })

  const handleClaim = async () => {
    if (!address || !qty || !merkleProof) return
    await claim.writeContract(
      {
        args: [address, qty, merkleProof],
      },
      {
        onSuccess: (data) => {
          showTxSentToast('claim-sent', data)
        },
        onError: (error) => {
          console.log(error)
          showTxErrorToast(error ?? `Tx could not be sent`)
        },
      },
    )
  }

  useEffect(() => {
    if (claim.data && claimTx.isSuccess) {
      showTxExecutedToast({ id: 'claim-executed', txHash: claim.data })
      claim.reset()
      refetchClaimCheck()
      refetchAll()
    }
    if (claim.data && claimTx.isError)
      showTxErrorToast(claimTx?.failureReason ?? `Tx failed`)
  }, [
    claim,
    refetchClaimCheck,
    claimTx?.failureReason,
    claimTx.isError,
    claimTx.isSuccess,
    showTxErrorToast,
    showTxExecutedToast,
    refetchAll,
  ])

  if (
    !isConnected ||
    isLoading ||
    !isAvailableToClaim ||
    !canClaim ||
    claimTx.isSuccess
  )
    return null

  return (
    <Box fontSize={'md'}>
      <Text mb={2}>You are elegible to mint {qty} nft for free</Text>
      <Button
        variant={'solid'}
        w={'full'}
        onClick={handleClaim}
        isLoading={claim.isPending || claimTx.isLoading}
        isDisabled={claim.isPending || claimTx.isLoading}
      >
        Mint now
      </Button>
    </Box>
  )
}

export default ClaimSection
