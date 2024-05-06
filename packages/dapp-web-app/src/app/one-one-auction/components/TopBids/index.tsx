import { Button, Box, Text } from '@chakra-ui/react'
import { useAccount, useEnsName } from 'wagmi'
import { cleanEmptyBids } from 'app/one-one-auction/data-handler'
import { CustomTable } from 'components/CustomTable'
import { TableRow } from 'components/CustomTable/TableRow'
import { formatToEtherStringBN } from 'utils/price'
import { isUserAddress, shortenAddress } from 'utils/string'
import { useAuctionContext } from 'contexts/AuctionContext'
import { SalesState } from 'types/auction'
import { useMemo } from 'react'

type TopBidsType = {
  bids: ReturnType<typeof cleanEmptyBids>
  onViewAll?: () => void
}

const TableRowWithENS = ({
  index,
  userAddress,
  bid,
}: {
  index: number
  userAddress?: string
  bid: ReturnType<typeof cleanEmptyBids>[number]
}) => {
  const { data = bid.bidder } = useEnsName({
    address: bid.bidder,
  })
  const handledAddress = useMemo(() => {
    if (data) {
      return shortenAddress(data, 10, 5)
    }
    return shortenAddress(bid.bidder, 5, 6)
  }, [bid.bidder, data])

  return (
    <TableRow
      index={index + 1}
      amount={formatToEtherStringBN(bid.amount)}
      address={isUserAddress(userAddress, bid.bidder) ? 'you' : handledAddress}
      fullAddress={data ?? bid.bidder}
      isHighlighted={isUserAddress(userAddress, bid.bidder)}
    />
  )
}
export const TopBids = ({ bids, onViewAll }: TopBidsType) => {
  const { address: userAddress } = useAccount()
  const { auctionState } = useAuctionContext()
  const auctionEnded = auctionState === SalesState.ENDED
  return (
    <Box>
      <Text fontWeight={'bold'}>
        {auctionEnded ? 'bid winners' : 'top 50 bids'}
      </Text>
      {bids.length === 0 && (
        <Text fontSize={'xs'} fontStyle={'italic'} mt={2}>
          No bids yet
        </Text>
      )}
      {bids.length > 0 && (
        <>
          <CustomTable mt={1} maxH={'260px'}>
            {bids.map((bid, index) => (
              <TableRowWithENS
                key={index}
                index={index}
                bid={bid}
                userAddress={userAddress}
              />
            ))}
          </CustomTable>
          <Button
            variant={'link'}
            textDecor={'underline'}
            colorScheme="blackAlpha"
            fontWeight={'normal'}
            border={0}
            mt={4}
            w={'min-content'}
            display={'inline-block'}
            onClick={onViewAll}
          >
            view all bids
          </Button>
        </>
      )}
    </Box>
  )
}
