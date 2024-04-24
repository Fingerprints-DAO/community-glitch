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
  FlexProps,
  Collapse,
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
import { SalesState, BidLogsType } from 'types/auction'
import ForceConnectButton from 'components/ForceConnectButton'
import { parseEther } from 'ethers'
import {
  useAccount,
  usePublicClient,
  useWaitForTransactionReceipt,
} from 'wagmi'
import { getContractAddressesForChainOrThrow } from '@dapp/sdk'
import { getChainId } from 'utils/chain'
import { InfoTooltip } from 'components/InfoTooltip'
import { TableRow } from 'components/CustomTable/TableRow'
import { CustomTable } from 'components/CustomTable'
import BidsModal from 'components/BidsModal'
import { TopBids } from '../TopBids'
import useGetTopBids from 'hooks/use-get-top-bids'
import { ClaimButton } from '../ClaimButton'
import useTxToast from 'hooks/use-tx-toast'
import { useDiscount } from 'hooks/use-discount'

const getCountdownText = (state: SalesState) => {
  console.log('state', state, SalesState.ENDED)
  if (state === SalesState.ENDED) {
    return 'auction ended'
  }
  if (state === SalesState.STARTED) {
    return 'remaining time: '
  }
  return 'auction starts in: '
}

const auctionContract = getContractAddressesForChainOrThrow(getChainId())

export const AuctionSidebar = (props: FlexProps) => {
  const { auctionState, startTime, endTime } = useAuctionContext()
  const [bidAmount, setBidAmount] = useState('')
  const publicClient = usePublicClient()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: minimumBid, refetch: refetchMinimumBid } =
    useReadAuctionGetMinimumBid()
  const { countdownInMili } = useCountdownTime({
    salesState: auctionState,
    startTime,
    endTime,
  })
  const { topBids, myBids, refetchBids } = useGetTopBids()
  const bid = useWriteAuctionBid()
  const bidTx = useWaitForTransactionReceipt({
    hash: bid?.data,
  })
  const userAccount = useAccount()
  const { showTxSentToast, showTxErrorToast, showTxExecutedToast } =
    useTxToast()
  const [outbids, setOutbids] = useState<BidLogsType>([])
  const [allBids, setAllBids] = useState<BidLogsType>([])
  const {
    value: discountValue,
    hasDiscount,
    merkleProof,
    isLoading: discountIsLoading,
  } = useDiscount()

  const auctionNotStartedAndNotIdle =
    auctionState !== SalesState.IDLE && auctionState !== SalesState.NOT_STARTED
  const auctionEnded = auctionState === SalesState.ENDED

  const onBid = async () => {
    await bid.writeContractAsync(
      {
        args: [parseEther(bidAmount), merkleProof],
        value: parseEther(bidAmount),
      },
      {
        onSuccess: (data) => {
          showTxSentToast('bid-sent', data)
          setBidAmount('')
        },
        onError: (error) => {
          showTxErrorToast(error ?? `Tx could not be sent`)
        },
      },
    )
  }

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    value = value.replace(/[^\d.]/g, '')

    if (value.includes('.')) {
      const parts = value.split('.')
      parts[1] = parts[1].slice(0, 3)
      value = parts.join('.')
    }

    setBidAmount(value)
  }

  useEffect(() => {
    async function getOutbids() {
      if (!publicClient || !userAccount.address) return
      const filter = await publicClient?.createContractEventFilter({
        ...auctionConfig,
        eventName: 'Outbidded',
        fromBlock: BigInt(auctionContract.startBlock),
        toBlock: 'latest',
        args: {
          bidder: userAccount.address,
        },
      })
      const logs = await publicClient.getFilterLogs({ filter })
      setOutbids(logs as BidLogsType)
    }

    getOutbids()
  }, [publicClient, userAccount.address, bidTx.isSuccess])

  useEffect(() => {
    async function getAllBids() {
      if (!publicClient) return
      const filter = await publicClient?.createContractEventFilter({
        ...auctionConfig,
        eventName: 'BidPlaced',
        fromBlock: BigInt(auctionContract.startBlock),
        toBlock: 'latest',
      })
      const bids = await publicClient.getFilterLogs({ filter })
      setAllBids(bids as BidLogsType)
    }

    getAllBids()
  }, [publicClient, userAccount.address, bidTx.isSuccess])

  useEffect(() => {
    if (bid.data && bidTx.isSuccess) {
      showTxExecutedToast({ id: 'bid-executed', txHash: bid.data })
      bid.reset()
      refetchBids()
      refetchMinimumBid()
    }
    if (bid.data && bidTx.isError)
      showTxErrorToast(bidTx?.failureReason ?? `Tx failed`)
  }, [
    bid,
    bidTx?.failureReason,
    bidTx.isError,
    bidTx.isSuccess,
    refetchBids,
    refetchMinimumBid,
    showTxErrorToast,
    showTxExecutedToast,
  ])

  console.log('auctionState', auctionState)

  return (
    <Flex
      as={'section'}
      px={8}
      py={6}
      border={'1px solid black'}
      bgColor={'white'}
      w={'full'}
      {...props}
    >
      <SkeletonText
        as={'div'}
        rounded={'none'}
        noOfLines={8}
        skeletonHeight={'10px'}
        isLoaded={auctionState !== SalesState.IDLE}
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
              <Text fontWeight={'bold'}>
                {auctionEnded ? 'final price' : 'lowest winning bid'}
              </Text>
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

          <div>
            <Collapse
              in={userAccount.isConnected && hasDiscount}
              animateOpacity
            >
              <Text
                fontSize={'sm'}
                as={'div'}
                bgColor={'gray.200'}
                p={2}
                mb={3}
              >
                You&apos;re elegible to get {discountValue}% discount
                <InfoTooltip
                  label="Discounts are applied on rebate of the winning bids. Check out our FAQ on about page."
                  iconProps={{ mt: '-1px', ml: 1 }}
                />
              </Text>
            </Collapse>
            {auctionState === SalesState.STARTED && (
              <ForceConnectButton buttonText="connect to bid">
                <Box>
                  <Flex justifyContent={'space-between'} gap={2}>
                    <InputGroup variant={'unstyled'}>
                      <InputLeftAddon fontSize={'12px'} pt={1}>
                        Ξ
                      </InputLeftAddon>
                      <Input
                        placeholder={`${formatToEtherStringBN(minimumBid)} or more`}
                        size={'md'}
                        colorScheme="blackAlpha"
                        pattern="\d*\.?\d*"
                        onChange={onChangeValue}
                        value={bidAmount}
                      />
                    </InputGroup>

                    <Button
                      variant={'solid'}
                      size={'md'}
                      px={8}
                      onClick={onBid}
                      isDisabled={
                        discountIsLoading ||
                        bid.isPending ||
                        Number(bidAmount) <
                          Number(formatToEtherStringBN(minimumBid))
                      }
                      isLoading={bid.isPending || discountIsLoading}
                    >
                      place bid
                    </Button>
                  </Flex>
                  <Text
                    mt={2}
                    fontSize={'sm'}
                    as={'div'}
                    onClick={() =>
                      setBidAmount(formatToEtherStringBN(minimumBid))
                    }
                    _hover={{ cursor: 'pointer' }}
                  >
                    minimum bid is{' '}
                    <Text fontSize={'9px'} as={'span'}>
                      Ξ
                    </Text>
                    {formatToEtherStringBN(minimumBid)}
                    <InfoTooltip
                      label="Bid at least this amount to be in top 50 and be able to mint"
                      iconProps={{ mt: '-1px', ml: 1 }}
                    />
                  </Text>
                </Box>
              </ForceConnectButton>
            )}
          </div>
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
          {auctionEnded && (
            <Box>
              <ForceConnectButton buttonText="connect to claim">
                <ClaimButton
                  nftsToClaim={myBids.length}
                  bidSpended={myBids.reduce((a, b) => a + b.amount, 0n)}
                  discountValue={discountValue}
                />
              </ForceConnectButton>
            </Box>
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
      {isOpen && <BidsModal bids={allBids} onClose={onClose} />}
    </Flex>
  )
}
