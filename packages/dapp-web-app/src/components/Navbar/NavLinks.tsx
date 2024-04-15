import {
  Grid,
  GridItem,
  Flex,
  Box,
  Text,
  GridProps,
  Button,
} from '@chakra-ui/react'
import { TextToltip } from 'components/TextTooltip'
import Wallet from 'components/Wallet'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccount } from 'wagmi'

const nav = [
  { href: '/about', label: 'about', isDisabled: false },
  { href: '/print-claim', label: 'print claim', isDisabled: false },
  {
    href: '/one-one-auction',
    label: '1/1 auction',
    isDisabled: false,
    // tooltip: 'starts on April 25, 2024 at 1:00 p.m. ET / 7:00 p.m. CET',
  },
  {
    href: '/mint-edition',
    label: 'mint edition',
    isDisabled: false,
    // tooltip: 'starts on Sunday, April 28 at 1 PM EDT / 7pm CEST',
  },
]

const NavItem = ({ item, isActive }: { item: any; isActive: boolean }) => {
  return (
    <Box
      as={Link}
      href={item.href}
      // title={item.label}
      mr={0}
      ml={{ base: 0, sm: 6 }}
      _hover={{
        color: item.isDisabled ? 'gray.300' : 'gray.900',
        cursor: 'pointer',
      }}
      color={item.isDisabled ? 'gray.300' : isActive ? 'gray.900' : 'gray.500'}
      transition="ease"
      transitionProperty="color"
      transitionDuration="0.2s"
    >
      <TextToltip label={item.tooltip} isDisabled={!item.tooltip}>
        <Text as="strong" fontSize="14px" lineHeight={'14px'}>
          {item.label}
        </Text>
      </TextToltip>
    </Box>
  )
}

export const NavLinks = (props: GridProps) => {
  const { isConnected } = useAccount()
  const pathname = usePathname()
  return (
    <Grid mt={{ base: 5, sm: 0 }} {...props}>
      <GridItem>
        <Flex
          as="nav"
          display="flex"
          flexDir={{ base: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="flex-start"
          gap={{ base: 6, sm: 0 }}
          h="full"
        >
          {nav.map((item, index) => {
            const isActive =
              (!item.isDisabled && pathname === item.href) ||
              (pathname.includes('gallery') && item.href === '/')
            if (item.label === '') return

            return <NavItem key={index} item={item} isActive={isActive} />
          })}
          {isConnected ? (
            <NavItem
              item={{ href: '/my-tokens', label: 'my tokens' }}
              isActive={false}
            />
          ) : null}
          {/* <Wallet buttonWidth={'auto'} ml={{ base: 0, sm: 6 }} /> */}
          <Button
            ml={{ base: 0, sm: 6 }}
            as={Link}
            variant={'outline'}
            fontWeight={'normal'}
            size={'xs'}
            href={'https://www.addevent.com/event/Kk21244343'}
            target="_blank"
          >
            add to calendar
          </Button>
        </Flex>
      </GridItem>
    </Grid>
  )
}
