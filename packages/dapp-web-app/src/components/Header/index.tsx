import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Wallet from 'components/Wallet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

const nav = [
  { href: '/about', label: 'about', isDisabled: false },
  { href: '/one-one-auction', label: '1/1 auction', isDisabled: false },
  { href: '/mint-edition', label: 'mint edition', isDisabled: false },
]

const NavItem = ({
  item,
  isActive,
  isDrawer,
}: {
  item: any
  isActive: boolean
  isDrawer: boolean
}) => {
  return (
    <Box
      as={Link}
      href={item.href}
      title={item.label}
      mr={0}
      ml={isDrawer ? 0 : 6}
      _hover={{
        color: item.isDisabled ? 'gray.300' : 'gray.900',
        cursor: item.isDisabled ? 'not-allowed' : 'pointer',
      }}
      color={item.isDisabled ? 'gray.300' : isActive ? 'gray.900' : 'gray.500'}
      transition="ease"
      transitionProperty="color"
      transitionDuration="0.2s"
    >
      <Text as="strong" fontSize="14px" lineHeight={'14px'}>
        {item.label}
      </Text>
    </Box>
  )
}

const Header = ({ isDrawer = false }) => {
  const { isConnected } = useAccount()
  const pathname = usePathname()

  return (
    <Flex
      as="header"
      position="relative"
      zIndex={1}
      w={'full'}
      alignItems={'center'}
      justifyContent={'space-between'}
      py={5}
    >
      <Box as={Link} href={'/'} fontWeight={'bold'} color={'black'}>
        glitch
      </Box>
      <Grid>
        <GridItem>
          <Flex
            as="nav"
            display="flex"
            flexDir={isDrawer ? 'column' : 'row'}
            alignItems="center"
            justifyContent="flex-start"
            gap={isDrawer ? 6 : 0}
            h="full"
          >
            {nav.map((item, index) => {
              const isActive =
                (!item.isDisabled && pathname === item.href) ||
                (pathname.includes('gallery') && item.href === '/')
              if (item.label === '') return

              return (
                <NavItem
                  key={index}
                  item={item}
                  isActive={isActive}
                  isDrawer={isDrawer}
                />
              )
            })}
            {isConnected ? (
              <NavItem
                item={{ href: '/my-tokens', label: 'my tokens' }}
                isActive={false}
                isDrawer={isDrawer}
              />
            ) : null}
            <Wallet buttonWidth={'auto'} ml={6} isDrawer={isDrawer} />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Header
