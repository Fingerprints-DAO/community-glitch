'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  Link as ChakraLink,
  Text,
  Flex,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  SkeletonText,
  useDisclosure,
} from '@chakra-ui/react'
import Link from 'next/link'
import { formatToEtherStringBN } from 'utils/price'
import {
  auctionConfig,
  useReadAuctionGetMinimumBid,
  useWriteAuctionBid,
} from 'web3/contract-functions'
import useCountdownTime from 'hooks/use-countdown-timer'
import Countdown from 'components/Countdown'
import { useAuctionContext } from 'contexts/AuctionContext'
import { AuctionState, BidLogsType } from 'types/auction'
import ForceConnectButton from 'components/ForceConnectButton'
import { parseEther } from 'ethers'
import { useAccount, usePublicClient } from 'wagmi'
import { getContractAddressesForChainOrThrow } from '@dapp/sdk'
import { getChainId } from 'utils/chain'
import { InfoTooltip } from 'components/InfoTooltip'
import { TableRow } from 'components/CustomTable/TableRow'
import { CustomTable } from 'components/CustomTable'
import BidsModal from 'components/BidsModal'
import { TopBids } from '../TopBids'
import useGetTopBids from 'hooks/use-get-top-bids'
import { ClaimButton } from '../ClaimButton'

const getCountdownText = (state: AuctionState) => {
  if (state === AuctionState.IDLE || state === AuctionState.NOT_STARTED) {
    return 'auction starts in: '
  }
  if (state === AuctionState.STARTED) {
    return 'remaining time: '
  }
  return 'auction ended.'
}

const auctionContract = getContractAddressesForChainOrThrow(getChainId())

export const AuctionSidebar = () => {
  const [bidAmount, setBidAmount] = useState('')
  const { auctionState } = useAuctionContext()
  const { data: minimunBid } = useReadAuctionGetMinimumBid()
  const { countdownInMili } = useCountdownTime()
  const { topBids, myBids } = useGetTopBids()
  const bid = useWriteAuctionBid()
  const userAccount = useAccount()
  const [outbids, setOutbids] = useState<BidLogsType>([])
  const [allBids, setAllBids] = useState<BidLogsType>([])
  const publicClient = usePublicClient()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const auctionNotStartedAndNotIdle =
    auctionState !== AuctionState.IDLE &&
    auctionState !== AuctionState.NOT_STARTED
  const auctionEnded = auctionState === AuctionState.ENDED

  const onBid = () => {
    bid.writeContractAsync({
      args: [
        parseEther(bidAmount),
        ['0x0000000000000000000000000000000000000000000000000000000000000000'],
      ],
      value: parseEther(bidAmount),
    })
  }

  useEffect(() => {
    async function getOutbids() {
      if (!publicClient || !userAccount.address) return
      const filter = await publicClient?.createContractEventFilter({
        ...auctionConfig,
        eventName: 'Outbid',
        fromBlock: BigInt(auctionContract.startBlock),
        args: {
          bidder: userAccount.address,
        },
      })
      const logs = await publicClient.getFilterLogs({ filter })
      setOutbids(logs as BidLogsType)
    }

    getOutbids()
  }, [publicClient, userAccount.address])

  useEffect(() => {
    async function getAllBids() {
      if (!publicClient) return
      const filter = await publicClient?.createContractEventFilter({
        ...auctionConfig,
        eventName: 'BidPlaced',
        fromBlock: BigInt(auctionContract.startBlock),
      })
      const bids = await publicClient.getFilterLogs({ filter })
      setAllBids(bids as BidLogsType)
    }

    getAllBids()
  }, [publicClient, userAccount.address])

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
                onClick={onOpen}
              >
                {allBids.length} bids
              </Button>
            </Flex>
          )}

          {auctionState === AuctionState.STARTED && (
            <ForceConnectButton buttonText="connect to bid">
              <Box>
                <Flex justifyContent={'space-between'} gap={2}>
                  <InputGroup variant={'unstyled'}>
                    <InputLeftAddon fontSize={'12px'} pt={1}>
                      Ξ
                    </InputLeftAddon>
                    <Input
                      placeholder="0.214 or more"
                      size={'md'}
                      colorScheme="blackAlpha"
                      type="number"
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </InputGroup>
                  <Button
                    variant={'solid'}
                    size={'md'}
                    px={8}
                    onClick={onBid}
                    isDisabled={
                      Number(bidAmount) <
                      Number(formatToEtherStringBN(minimunBid))
                    }
                  >
                    place bid
                  </Button>
                </Flex>
                <Text mt={2} fontSize={'sm'} as={'div'}>
                  minimun bid is{' '}
                  <Text fontSize={'9px'} as={'span'}>
                    Ξ
                  </Text>
                  {formatToEtherStringBN(minimunBid)}
                  <InfoTooltip label="Bid at least this amount to be in top 50 and be able to mint" />
                </Text>
              </Box>
            </ForceConnectButton>
          )}
          {auctionNotStartedAndNotIdle && (
            <>
              <Box>
                <TopBids bids={topBids} onViewAll={onOpen} />
              </Box>
              {(myBids.length > 0 || outbids.length > 0) && (
                <Box>
                  <Text fontWeight={'bold'} as={'div'}>
                    your winning bids & outbids{' '}
                    <InfoTooltip label="Outbids are your bids that are lower than the 50th bid. Outbids can be claimed after auction ends." />
                  </Text>
                  <CustomTable mt={1} maxH={'260px'}>
                    {myBids.map((bid) => (
                      <TableRow
                        key={bid.index}
                        index={bid.index}
                        amount={formatToEtherStringBN(bid.amount)}
                        isHighlighted
                      />
                    ))}
                    {outbids.map((bid) => (
                      <TableRow
                        key={bid.transactionHash}
                        amount={formatToEtherStringBN(bid.args.amount)}
                      />
                    ))}
                  </CustomTable>
                </Box>
              )}
            </>
          )}
          <Box>
            <ClaimButton nftsToClaim={myBids.length} />
          </Box>
          <Text as={'div'} fontSize={'xs'}>
            Refund, rebate and artwork claims will start after auction ends.{' '}
            <ChakraLink as={Link} href={'/about#faq'}>
              Read more
            </ChakraLink>
            .
          </Text>
        </Flex>
      </SkeletonText>
      {isOpen && <BidsModal bids={allBids} onClose={onClose} />}
    </Flex>
  )
}
