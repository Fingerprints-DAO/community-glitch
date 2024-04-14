'use client'

import FullPageTemplate from 'components/Templates/FullPage'
import Token from './components/Token'
import { AuctionProvider } from 'contexts/AuctionContext'
import StaticToken from './components/StaticToken'

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <FullPageTemplate>
      <AuctionProvider>
        {process.env.NEXT_PUBLIC_WEB3_NETWORK === 'mainnet' ? (
          <StaticToken id={Number(id)} />
        ) : (
          <Token id={Number(id)} />
        )}
      </AuctionProvider>
    </FullPageTemplate>
  )
}
