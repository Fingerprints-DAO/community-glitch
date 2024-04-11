import { Box, Flex } from '@chakra-ui/react'
import Navbar from 'components/Navbar'
import Link from 'next/link'

const Header = () => {
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
      <Navbar />
    </Flex>
  )
}

export default Header
