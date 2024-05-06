'use client'

import { GetClaimInfoResponse } from 'app/api/getClaimInfo/route'
import { useState, useEffect } from 'react'
import { fetcher } from 'utils/fetcher'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import { useReadGlitchyCheckFreeClaimAllowlist } from 'web3/contract-functions'

export function useClaimer() {
  const [qty, setQty] = useState<number | null>(null)
  const [merkleProof, setMerkleProof] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { address } = useAccount()
  const {
    data: isAvailableToClaim,
    refetch: refetchClaimCheck,
    isError,
  } = useReadGlitchyCheckFreeClaimAllowlist({
    args: [merkleProof, address!, qty!],
  })

  useEffect(() => {
    const checkClaimList = async (address: string) => {
      setIsLoading(true)
      try {
        const response = await fetcher<GetClaimInfoResponse>(
          '/api/getClaimInfo',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
          },
        )
        setQty(response.qty)
        setMerkleProof(response.merkleProof as Address[])
      } catch (error) {
        console.error('Error checking discounts:', error)
        setQty(null)
      }
      setIsLoading(false)
    }

    if (address) {
      checkClaimList(address)
    } else {
      setIsLoading(false)
    }
  }, [address])

  useEffect(() => {
    if (qty === null || merkleProof.length < 1 || isError) return
    refetchClaimCheck()
  }, [isAvailableToClaim, isError, merkleProof.length, qty, refetchClaimCheck])

  return {
    qty,
    canClaim: qty !== null && qty > 0,
    isLoading,
    merkleProof,
    isAvailableToClaim: isAvailableToClaim && !isError,
    refetchClaimCheck,
  }
}
