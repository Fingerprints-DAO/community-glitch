'use client'

import {
  Box,
  CloseButton,
  Modal,
  ModalContent,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Text,
} from '@chakra-ui/react'
import {
  cleanEmptyBids,
  orderBidsByAmount,
} from 'app/one-one-auction/data-handler'
import { CustomTable } from 'components/CustomTable'
import { TableRow } from 'components/CustomTable/TableRow'
import useMediaQuery from 'hooks/use-media-query'
import { useMemo } from 'react'
import { BidLogsType } from 'types/auction'
import { formatToEtherStringBN } from 'utils/price'
import { isUserAddress, shortenAddress } from 'utils/string'
import { useAccount, useEnsName } from 'wagmi'

type LastBidsProps = {
  bids: BidLogsType
  onClose: () => void
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
    return shortenAddress(bid.bidder, 8, 13)
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

const BidsModal = ({ bids, onClose }: LastBidsProps) => {
  const { address: userAddress = '' } = useAccount()
  const [isMobile] = useMediaQuery('(max-width: 1023px)')
  return (
    <Modal
      isCentered={true}
      isOpen={true}
      scrollBehavior={'outside'}
      motionPreset={isMobile ? 'slideInBottom' : 'scale'}
      onClose={onClose}
    >
      <ModalOverlay height="100vh" />
      <ModalContent
        bg="white"
        position={{ base: 'fixed', sm: 'unset' }}
        bottom={{ base: '0px', sm: 'unset' }}
        mb={{ base: '0', sm: 'auto' }}
        rounded={'none'}
        border={'1px solid black'}
        p={6}
        overflow={{ base: 'auto', md: 'initial' }}
      >
        <Box position="relative" py="13px" mb={7}>
          <Text as={'h2'} fontSize="lg" fontWeight="bold" lineHeight="24px">
            all bids
          </Text>
          <CloseButton
            color="gray.500"
            onClick={onClose}
            position="absolute"
            right={0}
            top={0}
            w="44px"
            h="44px"
            size="lg"
            rounded={'none'}
          />
        </Box>
        <CustomTable>
          {bids.length > 0 &&
            orderBidsByAmount(bids).map((bid, index) => (
              <TableRowWithENS
                key={index}
                index={index}
                bid={bid.args as any}
                userAddress={userAddress}
              />
              // <TableRow
              //   key={index}
              //   index={index + 1}
              //   amount={formatToEtherStringBN(bid.args.amount)}
              //   address={
              //     isUserAddress(userAddress, bid.args.bidder)
              //       ? 'you'
              //       : shortenAddress(bid.args.bidder, 8, 13)
              //   }
              //   fullAddress={bid.args.bidder}
              //   isHighlighted={isUserAddress(userAddress, bid.args.bidder)}
              //   hash={bid.transactionHash}
              // />
            ))}
        </CustomTable>
      </ModalContent>
    </Modal>
  )
}

export default BidsModal
