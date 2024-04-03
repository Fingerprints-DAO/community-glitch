'use client'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import {
  Box,
  Link as ChakraLink,
  Text,
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  TableContainer,
  Table,
  Tbody,
  TableCellProps,
  Td,
  Tr,
  SkeletonText,
  Skeleton,
} from '@chakra-ui/react'
import Link from 'next/link'
import { formatToEtherStringBN } from 'utils/price'
import { shortenAddress } from 'utils/string'
import {
  useReadAuctionGetTopBids,
  useWriteAuctionBid,
} from 'web3/contract-functions'
import useCountdownTime from 'hooks/use-countdown-timer'
import Countdown from 'components/Countdown'
import { useAuctionContext } from 'contexts/AuctionContext'
import { AuctionState } from 'types/auction'
import { cleanEmptyBids } from 'app/auction/data-handler'
import ForceConnectButton from 'components/ForceConnectButton'
import { parseEther, ZeroAddress } from 'ethers'
import { useAccount } from 'wagmi'

const TableCell = ({
  children,
  ...props
}: TableCellProps & { children: ReactNode }) => (
  <Td py={2} px={0} {...props}>
    <Text as={'div'}>{children}</Text>
  </Td>
)

const TableRow = ({
  index,
  amount,
  address,
  isHighlighted,
}: {
  index?: number
  amount: string
  address: string
  isHighlighted?: boolean
}) => (
  <Tr
    fontWeight={isHighlighted ? 'bold' : 'normal'}
    textDecor={!index ? 'line-through' : undefined}
  >
    <TableCell width={'35px'} pr={2}>
      {!index ? '-' : index + '.'}
    </TableCell>
    <TableCell width={'100px'} pr={4}>
      <Text as={'span'} fontSize={'10px'} mr={2}>
        Ξ
      </Text>
      {amount}
    </TableCell>
    <TableCell>{address}</TableCell>
  </Tr>
)

const getCountdownText = (state: AuctionState) => {
  if (state === AuctionState.IDLE || state === AuctionState.NOT_STARTED) {
    return 'auction starts in: '
  }
  if (state === AuctionState.STARTED) {
    return 'remaining time: '
  }
  return 'auction ended.'
}

const isUserAddress = (userAddress: string, address: string) =>
  userAddress.toLowerCase() === address.toLowerCase()

export const AuctionSidebar = () => {
  const [bidAmount, setBidAmount] = useState('')
  const { auctionState } = useAuctionContext()
  const { countdownInMili } = useCountdownTime()
  const { data: topBidsResult } = useReadAuctionGetTopBids()
  const bid = useWriteAuctionBid()
  const userAccount = useAccount()
  const topBids = useMemo(() => cleanEmptyBids(topBidsResult), [topBidsResult])
  const auctionNotStartedAndNotIdle =
    auctionState !== AuctionState.IDLE &&
    auctionState !== AuctionState.NOT_STARTED
  const auctionEnded = auctionState === AuctionState.ENDED

  const onBid = () => {
    console.log([parseEther(bidAmount), ['0x000000']])
    bid.writeContractAsync({
      args: [
        parseEther(bidAmount),
        ['0x0000000000000000000000000000000000000000000000000000000000000000'],
      ],
      value: parseEther(bidAmount),
    })
  }

  return (
    <Flex
      as={'section'}
      px={8}
      py={6}
      border={'1px solid black'}
      bgColor={'white'}
      w={'full'}
    >
      <SkeletonText
        as={'div'}
        rounded={'none'}
        noOfLines={8}
        skeletonHeight={'10px'}
        isLoaded={auctionState !== AuctionState.IDLE}
        fadeDuration={0.6}
      >
        <Flex flexDir={'column'} gap={8} w={'full'}>
          <Box>
            <Text as={'span'} fontWeight={'bold'}>
              {getCountdownText(auctionState)}
            </Text>{' '}
            {!auctionEnded && (
              <Text as={'span'}>
                <Countdown timestampInMili={countdownInMili} />
              </Text>
            )}
          </Box>

          {auctionNotStartedAndNotIdle && topBids.length > 0 && (
            <Flex flexDir={'column'} gap={4}>
              <Text fontWeight={'bold'}>lowest winning bid</Text>
              <Text>
                <Text as={'span'} fontSize={'xs'}>
                  Ξ
                </Text>{' '}
                {formatToEtherStringBN(topBids[topBids.length - 1].amount)}
              </Text>
              <Button
                variant={'link'}
                textDecor={'underline'}
                colorScheme="blackAlpha"
                fontWeight={'normal'}
                border={0}
                w={'min-content'}
                display={'inline-block'}
              >
                80 bids
              </Button>
            </Flex>
          )}

          {auctionState === AuctionState.STARTED && (
            <ForceConnectButton buttonText="connect to bid">
              <Flex justifyContent={'space-between'} gap={2}>
                <InputGroup variant={'unstyled'}>
                  <InputLeftAddon fontSize={'12px'} pt={1}>
                    Ξ
                  </InputLeftAddon>
                  <Input
                    placeholder="0.214 or more"
                    size={'md'}
                    colorScheme="blackAlpha"
                    onChange={(e) => setBidAmount(e.target.value)}
                  />
                </InputGroup>
                <Button
                  variant={'solid'}
                  size={'md'}
                  px={8}
                  onClick={onBid}
                  disabled={!bidAmount}
                >
                  place bid
                </Button>
              </Flex>
            </ForceConnectButton>
          )}
          {auctionNotStartedAndNotIdle && (
            <>
              <Box>
                <Text fontWeight={'bold'}>top 50 bids</Text>
                {topBids.length === 0 && (
                  <Text fontSize={'xs'} fontStyle={'italic'} mt={2}>
                    No bids yet
                  </Text>
                )}
                {topBids.length > 0 && (
                  <>
                    <TableContainer mt={1} maxH={'260px'} overflowY={'auto'}>
                      <Table
                        variant="simple"
                        size={'sm'}
                        textColor={'gray.500'}
                      >
                        <Tbody>
                          {topBids.map((bid, index) => (
                            <TableRow
                              key={index}
                              index={index + 1}
                              amount={formatToEtherStringBN(bid.amount)}
                              address={
                                isUserAddress(
                                  userAccount?.address as string,
                                  bid.bidder,
                                )
                                  ? 'you'
                                  : shortenAddress(bid.bidder, 5, 6)
                              }
                              isHighlighted={isUserAddress(
                                userAccount?.address as string,
                                bid.bidder,
                              )}
                            />
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                    <Button
                      variant={'link'}
                      textDecor={'underline'}
                      colorScheme="blackAlpha"
                      fontWeight={'normal'}
                      border={0}
                      mt={4}
                      w={'min-content'}
                      display={'inline-block'}
                    >
                      view all
                    </Button>
                  </>
                )}
              </Box>
              {topBids.length > 0 && (
                <Box>
                  <Text fontWeight={'bold'}>your bids</Text>
                  <TableContainer mt={1} maxH={'260px'} overflowY={'auto'}>
                    <Table variant="simple" size={'sm'} textColor={'gray.500'}>
                      <Tbody>
                        <TableRow index={2} amount={'3.02'} address={'you'} />
                        <TableRow amount={'0.1'} address={'you'} />
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </>
          )}
          <Text as={'div'} fontSize={'xs'}>
            Refund, rebate and artwork claims will start after auction ends.{' '}
            <ChakraLink as={Link} href={'/about#faq'}>
              Read more
            </ChakraLink>
            .
          </Text>
        </Flex>
      </SkeletonText>
    </Flex>
  )
}
