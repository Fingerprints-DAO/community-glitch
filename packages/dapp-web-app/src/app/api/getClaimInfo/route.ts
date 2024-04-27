import { NextResponse } from 'next/server'
import { fetcher } from 'utils/fetcher'

export type GetClaimInfoResponse = {
  canClaim: boolean
  qty: number
  merkleProof: string[]
}

export async function POST(req: Request) {
  const { address } = await req.json()
  let qty = 0
  let canClaim = false
  let merkleProof = []

  try {
    const response = await fetcher(
      `http://localhost:3001/api/glitch/claimList?address=${address}`,
    )
    if (response.canClaim) {
      canClaim = true
      qty = response.qty
      merkleProof = response.merkleProof
    }
  } catch (error) {
    console.error('Error checking claim list:', error)
    canClaim = false
  }

  return NextResponse.json({
    canClaim,
    qty,
    merkleProof,
  })
}
