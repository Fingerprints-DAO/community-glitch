'use client'
import {
  Box,
  Link as ChakraLink,
  Text,
  Flex,
  SkeletonText,
  FlexProps,
  TextProps,
  List,
  ListItem,
  Button,
  Input,
} from '@chakra-ui/react'
import useCountdownTime from 'hooks/use-countdown-timer'
import Countdown from 'components/Countdown'
import { SalesState } from 'types/auction'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import { EtherSymbol } from 'components/EtherSymbol'
import { useMintEditionContext } from 'contexts/MintEditionContext'
import Link from 'next/link'
import { glitchyAddress, useWriteGlitchyMint } from 'web3/contract-functions'
import { getExternalEtherscanUrl, getExternalOpenseaUrl } from 'utils/getLink'
import { useDiscount } from 'hooks/use-discount'
import ForceConnectButton from 'components/ForceConnectButton'
import TotalPriceDisplay from './TotalPriceDisplay'
import { TxMessage } from 'components/TxMessage'
import { GoDash, GoPlus } from 'react-icons/go'
import { useAccount, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'
import useTxToast from 'hooks/use-tx-toast'

const TextSection = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactNode
  props?: TextProps
}) => (
  <>
    <Text as={'h2'} fontSize={'xl'} fontWeight={'bold'} mb={4} {...props}>
      {title}
    </Text>
    <Text as={'div'}>{children}</Text>
  </>
)

const SubTitle = ({
  children,
  ...props
}: {
  children: ReactNode
  props?: TextProps
}) => (
  <Text as={'h3'} fontSize={'lg'} fontWeight={'bold'} mt={4} {...props}>
    {children}
  </Text>
)
const SubTextSection = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactNode
  props?: TextProps
}) => (
  <>
    <SubTitle {...props}>{title}</SubTitle>
    <Text as={'div'} fontSize={'md'}>
      {children}
    </Text>
  </>
)

const getCountdownText = (state: SalesState) => {
  if (state === SalesState.IDLE || state === SalesState.NOT_STARTED) {
    return 'mint starts in'
  }
  if (state === SalesState.STARTED) {
    return 'remaining time'
  }
  return 'mint ended'
}

export const MintSidebar = (props: FlexProps) => {
  const [counter, setCounter] = useState(0)
  const {
    mintState,
    startTime,
    endTime,
    price,
    priceWithDiscount,
    maxSupply,
    minted,
    limitPerTx,
    refetchAll,
  } = useMintEditionContext()
  const { countdownInMili } = useCountdownTime({
    salesState: mintState,
    startTime,
    endTime,
  })
  const {
    hasDiscount,
    merkleProof,
    isLoading: discountIsLoading,
  } = useDiscount()
  const account = useAccount()
  const { showTxSentToast, showTxErrorToast, showTxExecutedToast } =
    useTxToast()
  const mint = useWriteGlitchyMint()
  const mintTx = useWaitForTransactionReceipt({
    hash: mint?.data,
  })

  const availableToMint = useMemo(() => {
    const available = Number(maxSupply - minted)
    return available > limitPerTx ? limitPerTx : available
  }, [limitPerTx, maxSupply, minted])

  const handleCounter = (value: number) => {
    if (value < 0) return
    if (value > availableToMint) {
      setCounter(availableToMint)
      return
    }
    setCounter(value)
  }

  const handleMint = async () => {
    if (!account.address || counter < 1) return
    await mint.writeContract(
      {
        args: [account.address, counter, merkleProof],
        value: parseEther(
          (counter * (hasDiscount ? priceWithDiscount : price)).toString(),
        ),
      },
      {
        onSuccess: (data) => {
          showTxSentToast('mint-sent', data)
          setCounter(0)
        },
        onError: (error) => {
          console.log(error)
          showTxErrorToast(error ?? `Tx could not be sent`)
        },
      },
    )
  }

  useEffect(() => {
    if (mint.data && mintTx.isSuccess) {
      showTxExecutedToast({ id: 'mint-executed', txHash: mint.data })
      mint.reset()
      refetchAll()
    }
    if (mint.data && mintTx.isError)
      showTxErrorToast(mintTx?.failureReason ?? `Tx failed`)
  }, [
    mint,
    mintTx?.failureReason,
    mintTx.isError,
    mintTx.isSuccess,
    refetchAll,
    showTxErrorToast,
    showTxExecutedToast,
  ])

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
        isLoaded={mintState !== SalesState.IDLE && !discountIsLoading}
        fadeDuration={0.6}
      >
        <Flex flexDir={'column'} gap={8} w={'full'}>
          <Flex
            justifyContent={{ base: '', sm: 'space-between' }}
            flexWrap={'wrap'}
            gap={10}
          >
            <Box>
              <Text fontWeight={'bold'}>{getCountdownText(mintState)}</Text>
              <Text hidden={mintState === SalesState.ENDED}>
                <Countdown timestampInMili={countdownInMili} />
              </Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>
                fixed price
                <Text
                  as="span"
                  hidden={!hasDiscount}
                  fontSize={'xs'}
                  fontWeight={'normal'}
                >
                  {' '}
                  (-15%)
                </Text>
              </Text>
              <Text>
                <Text
                  as="span"
                  textDecor={hasDiscount ? 'line-through' : ''}
                  textColor={hasDiscount ? 'gray.400' : 'black'}
                >
                  {price}
                </Text>
                <Text as="span" hidden={!hasDiscount}>
                  {' '}
                  {priceWithDiscount}
                </Text>
                <EtherSymbol />
              </Text>
            </Box>
            <Box>
              <Text fontWeight={'bold'}>minted/supply</Text>
              <Text>
                {Number(minted)}/{Number(maxSupply)} tokens
              </Text>
            </Box>
          </Flex>
          {mintState === SalesState.STARTED && (
            <Flex mt={4} justifyContent={'space-between'} shrink={0} flex={1}>
              <Box minW={'30%'}>
                <Text fontSize={'xs'} fontWeight={'bold'} mb={2}>
                  Quantity
                </Text>
                <Flex>
                  <Button
                    variant={'outline'}
                    mr={2}
                    onClick={() => handleCounter(counter - 1)}
                    borderWidth={'2px'}
                    fontWeight={'bold'}
                    fontSize={'md'}
                  >
                    <GoDash size={18} />
                  </Button>
                  <Input
                    htmlSize={4}
                    w={'54px'}
                    p={1}
                    textAlign={'center'}
                    mr={2}
                    colorScheme="blackAlpha"
                    focusBorderColor={'gray.900'}
                    _hover={{ borderColor: 'gray.900' }}
                    color={'gray.700'}
                    fontWeight={'bold'}
                    fontSize={'md'}
                    borderColor={'gray.900'}
                    borderRadius={'none'}
                    borderWidth={'2px'}
                    value={counter}
                    onChange={(e) => handleCounter(Number(e.target.value))}
                  />
                  <Button
                    variant={'outline'}
                    mr={2}
                    onClick={() => handleCounter(counter + 1)}
                    borderWidth={'2px'}
                    fontWeight={'bold'}
                    fontSize={'md'}
                  >
                    <GoPlus size={18} />
                  </Button>
                </Flex>
              </Box>
              <Box ml={4} flex={2}>
                <Box mb={2}>
                  <TotalPriceDisplay
                    selectedItemsCount={counter}
                    price={price}
                    priceWithDiscount={priceWithDiscount}
                    hasDiscount={hasDiscount}
                  />
                </Box>
                <ForceConnectButton buttonText="Connect to mint">
                  <>
                    <Button
                      variant={'solid'}
                      w={'full'}
                      isDisabled={
                        counter < 1 || mint.isPending || mintTx.isLoading
                      }
                      onClick={handleMint}
                    >
                      {mint.isPending
                        ? 'waiting for approval...'
                        : mintTx.isLoading
                          ? 'processing...'
                          : 'mint'}
                    </Button>
                  </>
                </ForceConnectButton>
              </Box>
            </Flex>
          )}
          <Flex flexDir={'column'} gap={10}>
            <Box as={'section'}>
              <TextSection title="details">
                <List>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      start date:
                    </Text>{' '}
                    <Text as={'span'}>
                      sunday, april 28 at 1pm edt / 7pm cest
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      end date:
                    </Text>{' '}
                    <Text as={'span'}>
                      sunday, may 5 11:59pm edt / monday, may 6, 5:59am cest
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      price:
                    </Text>{' '}
                    <Text as={'span'}>
                      {price}
                      <EtherSymbol />
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      creator&apos;s fee:
                    </Text>{' '}
                    <Text as={'span'}>5%</Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      supply:
                    </Text>{' '}
                    <Text as={'span'}>510 artworks</Text>
                  </ListItem>
                  <ListItem mb={5}>
                    <Text as={'span'} fontWeight={'bold'}>
                      blockchain:
                    </Text>{' '}
                    <Text as={'span'}>ethereum</Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <ChakraLink
                      as={Link}
                      target="_blank"
                      href={getExternalEtherscanUrl(glitchyAddress)}
                      title="etherscan"
                    >
                      view smart contract
                    </ChakraLink>
                  </ListItem>
                  <ListItem mb={2}>
                    <ChakraLink
                      as={Link}
                      target="_blank"
                      href={getExternalOpenseaUrl(glitchyAddress)}
                      title="OpenSea"
                    >
                      view collection on opensea
                    </ChakraLink>
                  </ListItem>
                </List>
                <Text mt={6}>
                  glitch by misha de ridder, released by Fingerprints, is a
                  collection of 50 animated GIFs, stemming from photographs of
                  erased graffiti. The act of erasing can involve both
                  destruction and generation, transformation and
                  reimagination—allowing for new possibilities to emerge.
                </Text>
                <Text mt={4}>
                  As soon as the 1/1 auction closes, a limited mint of 510
                  editions will become available. The edition piece is a
                  randomized composite image of all 50 animations, each
                  representing one of the many possible options of the full
                  collection mosaic, minted as HTML-page. The mint is limited to
                  510 editions. The art is slowly degraded as more editions are
                  minted following the steps of the 1/1s — until the last 10
                  editions are left completely blank. There&apos;s no way to
                  restore, what you mint is what you get.
                </Text>
              </TextSection>
            </Box>
          </Flex>
        </Flex>
      </SkeletonText>
    </Flex>
  )
}
