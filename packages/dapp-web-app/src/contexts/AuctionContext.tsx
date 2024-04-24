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
import { AuctionData, SalesState } from 'types/auction'
import { useBoolean } from '@chakra-ui/react'

export const AuctionContext = createContext<
  HandledAuctionConfigToDayJs &
    AuctionData & {
      auctionState: SalesState
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
  auctionState: SalesState.NOT_STARTED,
  burnedTokensIds: [],
  isLoadingBurnedCall: true,
})

export const useAuctionContext = () => useContext(AuctionContext)

const getCurrentState = (
  startTime?: HandledAuctionConfigToDayJs['startTime'],
  endTime?: HandledAuctionConfigToDayJs['endTime'],
) => {
  if (!startTime || !endTime) {
    return SalesState.IDLE
  }
  const now = dayjs()

  console.log('endTime', endTime.toDate())
  if (now.isAfter(endTime)) {
    return SalesState.ENDED
  }

  if (now.isAfter(startTime)) {
    return SalesState.STARTED
  }

  return SalesState.NOT_STARTED
}

export const AuctionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [config, setConfig] = useState<HandledAuctionConfigToDayJs>(
    defaultAuctionConfigDayJs,
  )
  const [configIsLoading, setConfigIsloading] = useState(true)
  const [burnedTokensIds, setBurnedTokensIds] = useState<number[]>([])
  const [isLoadingBurnedCall, setIsLoadingBurnedCall] = useBoolean(true)

  // Add useState for auctionState
  const [auctionState, setAuctionState] = useState<SalesState>(SalesState.IDLE)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    async function fetchBurnedTokens() {
      try {
        setIsLoadingBurnedCall.on()
        const tokensBurned = (await fetch('/api/tokens/burned').then((res) =>
          res.json(),
        )) as ReturnType<typeof handleBurnedTokens>

        setBurnedTokensIds(tokensBurned)
        setIsLoadingBurnedCall.off()
      } catch (e) {
        console.log('Error getting burned tokens', e)
        setIsLoadingBurnedCall.off()
      }
    }

    if (!setIsLoadingBurnedCall) return
    fetchBurnedTokens()
  }, [setIsLoadingBurnedCall])

  useEffect(() => {
    async function fetchData() {
      setConfigIsloading(true)
      try {
        const config = (await fetch('/api/auction/config').then((res) =>
          res.json(),
        )) as HandledAuctionConfig

        if (!config) throw new Error('Config not found')
        setConfig(handleAuctionConfigToDayJs(config))
      } catch (e) {
        console.log('Error getting config', e)
      }
      setConfigIsloading(false)
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
    if (configIsLoading) return

    intervalRef.current = setInterval(checkAndUpdateState, 30000)
    checkAndUpdateState()

    return () => clearInterval(intervalRef.current!)
  }, [config.endTime, config.startTime, configIsLoading])

  return (
    <AuctionContext.Provider
      value={{
        ...config,
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
