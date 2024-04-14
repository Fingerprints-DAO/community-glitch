'use client'

import FullPageTemplate from 'components/Templates/FullPage'
import ArtGrid from 'components/ArtGrid'
import { AuctionProvider } from 'contexts/AuctionContext'
// import StaticArtGrid from 'components/ArtGrid/Static'
import dynamic from 'next/dynamic'

const DynamicArtGrid = dynamic(() => import('components/ArtGrid/Static'), {
  ssr: false,
})
export default function Home() {
  return (
    <FullPageTemplate>
      <AuctionProvider>
        {process.env.NEXT_PUBLIC_WEB3_NETWORK === 'mainnet' ? (
          <DynamicArtGrid />
        ) : (
          <ArtGrid />
        )}
      </AuctionProvider>
    </FullPageTemplate>
  )
}
