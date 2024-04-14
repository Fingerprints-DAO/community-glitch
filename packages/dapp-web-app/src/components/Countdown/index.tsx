import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

interface CountdownProps {
  timestampInMili: number
}

const Countdown = ({ timestampInMili }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState('-')

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = dayjs()
      const future = dayjs(timestampInMili)
      const diff = future.diff(now)

      if (diff <= 0) {
        clearInterval(intervalId)
        setTimeLeft('00:00')
      } else {
        const duration = dayjs.duration(diff)

        const days = duration.days()
        const hours = duration.hours()
        const minutes = duration.minutes().toString().padStart(2, '0')
        const seconds = duration.seconds().toString().padStart(2, '0')

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`)
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`)
        }
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timestampInMili])

  return <span>{timeLeft}</span>
}

export default Countdown
