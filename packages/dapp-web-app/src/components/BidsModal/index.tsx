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
import { orderBidsByAmount } from 'app/one-one-auction/data-handler'
import { CustomTable } from 'components/CustomTable'
import { TableRow } from 'components/CustomTable/TableRow'
import useMediaQuery from 'hooks/use-media-query'
import { BidLogsType } from 'types/auction'
import { formatToEtherStringBN } from 'utils/price'
import { isUserAddress, shortenAddress } from 'utils/string'
import { useAccount } from 'wagmi'

type LastBidsProps = {
  bids: BidLogsType
  onClose: () => void
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
              <TableRow
                key={index}
                index={index + 1}
                amount={formatToEtherStringBN(bid.args.amount)}
                address={
                  isUserAddress(userAddress, bid.args.bidder)
                    ? 'you'
                    : shortenAddress(bid.args.bidder, 5, 6)
                }
                isHighlighted={isUserAddress(userAddress, bid.args.bidder)}
              />
            ))}
        </CustomTable>
      </ModalContent>
    </Modal>
  )
}

export default BidsModal
