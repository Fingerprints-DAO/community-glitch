import { cleanEmptyBids, filterMyBids } from 'app/one-one-auction/data-handler'
import { useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useReadAuctionGetTopBids } from 'web3/contract-functions'

const useGetTopBids = () => {
  const { address: userAddress } = useAccount()
  const { data: topBidsResult, refetch } = useReadAuctionGetTopBids()
  const topBids = useMemo(() => cleanEmptyBids(topBidsResult), [topBidsResult])
  const myBids = useMemo(
    () => filterMyBids(userAddress, topBids),
    [topBids, userAddress],
  )

  const refetchBids = () => {
    refetch()
  }

  return { topBids, myBids, refetchBids }
}

export default useGetTopBids
