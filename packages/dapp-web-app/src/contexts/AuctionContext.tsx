import dayjs from 'dayjs'
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react'
import {
  defaultAuctionConfigDayJs,
  handleAuctionConfigToDayJs,
  handleBurnedTokens,
  HandledAuctionConfig,
  HandledAuctionConfigToDayJs,
} from 'app/one-one-auction/data-handler'
import { AuctionData, AuctionState } from 'types/auction'
import { useBoolean } from '@chakra-ui/react'

export const AuctionContext = createContext<
  HandledAuctionConfigToDayJs &
    AuctionData & {
      auctionState: AuctionState
      burnedTokensIds: number[]
      isLoadingBurnedCall: boolean
    }
>({
  startTime: dayjs(),
  endTime: dayjs(),
  startAmountInWei: 0,
  minBidIncrementInWei: 0,
  currentPrice: 0n,
  minted: 0n,
  maxSupply: 0n,
  auctionState: AuctionState.NOT_STARTED,
  burnedTokensIds: [],
  isLoadingBurnedCall: true,
})

export const useAuctionContext = () => useContext(AuctionContext)

const getCurrentState = (
  startTime?: HandledAuctionConfigToDayJs['startTime'],
  endTime?: HandledAuctionConfigToDayJs['endTime'],
) => {
  if (!startTime || !endTime) {
    return AuctionState.IDLE
  }
  const now = dayjs()

  if (now.isAfter(endTime)) {
    return AuctionState.ENDED
  }

  if (now.isAfter(startTime)) {
    return AuctionState.STARTED
  }

  return AuctionState.NOT_STARTED
}

export const AuctionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [config, setConfig] = useState<HandledAuctionConfigToDayJs>(
    defaultAuctionConfigDayJs,
  )
  const [burnedTokensIds, setBurnedTokensIds] = useState<number[]>([])
  const [isLoadingBurnedCall, setIsLoadingBurnedCall] = useBoolean(true)

  // Add useState for auctionState
  const [auctionState, setAuctionState] = useState<AuctionState>(
    AuctionState.IDLE,
  )
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    async function fetchBurnedTokens() {
      try {
        const tokensBurned = (await fetch('/api/tokens/burned').then((res) =>
          res.json(),
        )) as ReturnType<typeof handleBurnedTokens>

        setBurnedTokensIds(tokensBurned)
      } catch (e) {
        console.log(e)
      }
      setIsLoadingBurnedCall.off()
    }
    fetchBurnedTokens()
  }, [setIsLoadingBurnedCall])

  useEffect(() => {
    async function fetchData() {
      try {
        const config = (await fetch('/api/auction/config').then((res) =>
          res.json(),
        )) as HandledAuctionConfig

        if (!config) throw new Error('Config not found')
        setConfig(handleAuctionConfigToDayJs(config))
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const checkAndUpdateState = () => {
      const now = dayjs()
      const ONE_MINUTE = 60 // in seconds

      const isCloseToStartOrEnd =
        now.diff(config.startTime, 'seconds') <= ONE_MINUTE ||
        now.diff(config.endTime, 'seconds') <= ONE_MINUTE

      setAuctionState(getCurrentState(config.startTime, config.endTime))

      // If past config.endTime, clear interval and exit
      if (now.isAfter(config.endTime)) {
        clearInterval(intervalRef.current!)
        return
      }

      if (isCloseToStartOrEnd) {
        clearInterval(intervalRef.current!)
        intervalRef.current = setInterval(checkAndUpdateState, 1000)
      }
    }

    intervalRef.current = setInterval(checkAndUpdateState, 30000)
    checkAndUpdateState()

    return () => clearInterval(intervalRef.current!)
  }, [config.endTime, config.startTime])

  return (
    <AuctionContext.Provider
      value={{
        ...config,
        // currentPrice: price,
        // minted: currentTokenId - 1n,
        // maxSupply,
        currentPrice: 0n,
        minted: 50n,
        maxSupply: 50n,
        auctionState,
        burnedTokensIds,
        isLoadingBurnedCall,
      }}
    >
      {children}
    </AuctionContext.Provider>
  )
}
