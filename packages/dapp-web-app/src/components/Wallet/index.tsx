'use client'

import React, { useMemo } from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { useAccount, useDisconnect, useEnsName } from 'wagmi'
import { ConnectKitButton } from 'connectkit'
import { shortenAddress } from 'utils/string'

type WalletProps = ButtonProps & {
  buttonWidth?: string
  isDrawer?: boolean
}

const Wallet = ({ buttonWidth = 'full', ...props }: WalletProps) => {
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const name = shortenAddress(ensName || address, 5, 3)

  const handleConnectWallet =
    (isConnected: boolean, show?: () => void) => () =>
      isConnected ? disconnect() : show?.()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <Button
            w={buttonWidth}
            onClick={handleConnectWallet(isConnected, show)}
            variant={isConnected ? 'outline' : 'solid'}
            fontWeight={isConnected ? 'normal' : 'bold'}
            size={'xs'}
            {...props}
          >
            {isConnected ? name : 'connect'}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}

export default Wallet
