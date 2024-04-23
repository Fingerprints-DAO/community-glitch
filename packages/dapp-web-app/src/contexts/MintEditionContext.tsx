import dayjs from 'dayjs'
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react'
import {
  defaultMintConfigDayJs,
  handleMintConfigToDayJs,
  HandledMintConfig,
  HandledMintConfigToDayJs,
} from 'app/mint-edition/data-handler'
import { MintData } from 'types/mint'
import { SalesState } from 'types/auction'
import { useReadGlitchyTotalSupply } from 'web3/contract-functions'

export const MintEditionContext = createContext<
  HandledMintConfigToDayJs &
    MintData & {
      mintState: SalesState
      limitPerTx: number
      refetchAll: () => void
    }
>({
  startTime: dayjs(),
  endTime: dayjs(),
  price: 0.025,
  priceWithDiscount: 0.02125,
  minted: 0n,
  maxSupply: 510n,
  mintState: SalesState.NOT_STARTED,
  limitPerTx: 10,
  refetchAll: () => {},
})

export const useMintEditionContext = () => useContext(MintEditionContext)

const getCurrentState = (
  startTime?: HandledMintConfigToDayJs['startTime'],
  endTime?: HandledMintConfigToDayJs['endTime'],
  minted?: BigInt,
  maxSupply?: number,
) => {
  if (!startTime || !endTime) {
    return SalesState.IDLE
  }
  if (Number(minted) === maxSupply) {
    return SalesState.SOLD_OUT
  }
  const now = dayjs()

  if (now.isAfter(endTime)) {
    return SalesState.ENDED
  }

  if (now.isAfter(startTime)) {
    return SalesState.STARTED
  }

  return SalesState.NOT_STARTED
}

const maxSupply = 510
export const MintEditionProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [config, setConfig] = useState<HandledMintConfigToDayJs>(
    defaultMintConfigDayJs,
  )

  // Add useState for mintState
  const [mintState, setMintState] = useState<SalesState>(SalesState.IDLE)
  const intervalRef = useRef<NodeJS.Timeout>()
  const intervalRefRefetch = useRef<NodeJS.Timeout>()
  const { data: minted = 0n, refetch: refetchMinted } =
    useReadGlitchyTotalSupply()

  const refetchAll = useCallback(() => {
    refetchMinted()
  }, [refetchMinted])

  useEffect(() => {
    async function fetchData() {
      try {
        const config = (await fetch('/api/mint/config').then((res) =>
          res.json(),
        )) as HandledMintConfig

        if (!config) throw new Error('Config not found')
        setConfig(handleMintConfigToDayJs(config))
      } catch (e) {
        console.log('Error getting config', e)
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

      setMintState(
        getCurrentState(config.startTime, config.endTime, minted, maxSupply),
      )

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

    intervalRef.current = setInterval(checkAndUpdateState, 60000)
    checkAndUpdateState()

    return () => clearInterval(intervalRef.current!)
  }, [config.endTime, config.startTime, minted])

  useEffect(() => {
    // refetch minted number each 1 minute
    intervalRefRefetch.current = setInterval(refetchAll, 60000)

    return () => clearInterval(intervalRefRefetch.current!)
  }, [refetchAll])

  return (
    <MintEditionContext.Provider
      value={{
        ...config,
        minted,
        maxSupply: BigInt(maxSupply),
        mintState,
        limitPerTx: 10,
        refetchAll,
      }}
    >
      {children}
    </MintEditionContext.Provider>
  )
}
