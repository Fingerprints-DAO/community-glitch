'use client'

import { GetDiscountResponse } from 'app/api/getDiscount/route'
import { useState, useEffect } from 'react'
import { fetcher } from 'utils/fetcher'
import { Address } from 'viem'
import { useAccount } from 'wagmi'

export function useDiscount() {
  const [discountValue, setDiscountValue] = useState<number | null>(null)
  const [merkleProof, setMerkleProof] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { address } = useAccount()

  useEffect(() => {
    const checkDiscount = async (address: string) => {
      setIsLoading(true)
      try {
        const response = await fetcher<GetDiscountResponse>(
          '/api/getDiscount',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
          },
        )
        setDiscountValue(response.discountPercentage)
        setMerkleProof(response.merkleProof as Address[])
      } catch (error) {
        console.error('Error checking discounts:', error)
        setDiscountValue(null)
      }
      setIsLoading(false)
    }

    if (address) checkDiscount(address)
  }, [address])

  return {
    value: discountValue,
    hasDiscount: discountValue !== null && discountValue > 0,
    isLoading,
    merkleProof,
  }
}
