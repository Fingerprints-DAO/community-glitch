'use client'
import { useAuctionContext } from 'contexts/AuctionContext'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { SalesState } from 'types/auction'
import { Interval } from 'types/interval'

const timeToGo = (time: number) => {
  const endDateUnix = dayjs.unix(time)
  return endDateUnix
}

const handleMinutes = (time: number) => {
  const currentTime = dayjs()
  const remainingTime = dayjs(timeToGo(time)).diff(currentTime, 'seconds')

  if (remainingTime <= 0) {
    return 0
  }

  const minutes = Math.ceil(remainingTime / 60)

  return minutes
}

export const displayCountdown = (endTime: number) => {
  const remainingSeconds = dayjs(timeToGo(endTime)).diff(dayjs(), 'seconds')
  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

export type UseCountdownTimeProps = {
  startTime: Dayjs
  endTime: Dayjs
  salesState: SalesState
}
const useCountdownTime = ({
  startTime,
  endTime,
  salesState,
}: UseCountdownTimeProps) => {
  const [countdown, setCountdown] = useState(0)
  const [countdownInMili, setCountdownInMili] = useState(0)

  const handleTime = useCallback(() => {
    let time = 0

    if (
      salesState === SalesState.NOT_STARTED ||
      salesState === SalesState.IDLE
    ) {
      time = startTime.valueOf() ?? 0
    }

    if (salesState === SalesState.STARTED) {
      time = endTime.valueOf() ?? 0
    }

    setCountdownInMili(time)

    const minutes = handleMinutes(time ?? 0)

    setCountdown(minutes)
  }, [salesState, startTime, endTime])

  useEffect(() => {
    const interval = setInterval(handleTime, Interval.Timer)

    handleTime()

    return () => {
      clearInterval(interval)
    }
  }, [handleTime])

  return {
    countdown,
    countdownInMili,
  }
}

export default useCountdownTime
