import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  { href: '/', label: 'gallery', isDisabled: false },
  { href: '/about', label: 'about', isDisabled: false },
  { href: '/auction', label: '1/1 edition', isDisabled: false },
  { href: '/limited-edition', label: 'limited edition', isDisabled: false },
]

const Header = ({ isDrawer = false }) => {
  const pathname = usePathname()

  return (
    <Flex
      as="header"
      position="relative"
      zIndex={1}
      w={'full'}
      alignItems={'center'}
      justifyContent={'space-between'}
      py={8}
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
                <Box
                  key={index}
                  as={Link}
                  href={item.href}
                  title={item.label}
                  mr={0}
                  ml={isDrawer ? 0 : 6}
                  _hover={{
                    color: item.isDisabled ? 'gray.300' : 'gray.900',
                    cursor: item.isDisabled ? 'not-allowed' : 'pointer',
                  }}
                  color={
                    item.isDisabled
                      ? 'gray.300'
                      : isActive
                        ? 'gray.900'
                        : 'gray.500'
                  }
                  transition="ease"
                  transitionProperty="color"
                  transitionDuration="0.2s"
                >
                  <Text as="strong" fontSize="14px" lineHeight={'14px'}>
                    {item.label}
                  </Text>
                </Box>
              )
            })}
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  )
}

export default Header
