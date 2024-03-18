import 'assets/styles/globals.css'

import type { Metadata } from 'next'
import Providers from 'contexts/providers'

export const metadata: Metadata = {
  title: 'arod.studio react ts template',
  description: 'Generated by create next app and customized by arod.studio',
}

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
