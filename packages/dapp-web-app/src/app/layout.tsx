import 'assets/styles/globals.css'

import type { Metadata } from 'next'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import duration from 'dayjs/plugin/duration'
import Providers from 'contexts/providers'

export const metadata: Metadata = {
  title: 'glitch by misha de ridder & fingerprints dao',
  description: 'description',
}

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(duration)

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
