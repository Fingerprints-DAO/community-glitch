import {
  Box,
  ComponentDefaultProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import Footer from 'components/Footer'
import { NavLinks } from './NavLinks'

const Navbar = ({
  additionalNav,
  ...props
}: ComponentDefaultProps & {
  additionalNav?: React.ReactNode
}) => {
  const {
    isOpen: navIsOpen,
    onOpen: navOnOpen,
    onClose: navOnClose,
  } = useDisclosure()

  return (
    <>
      <NavLinks hideBelow={'sm'} />
      <Box hideFrom={'sm'}>
        <VStack
          bg="white"
          maxH={'100%'}
          minW={{ base: '30px', sm: '44px' }}
          pos={'relative'}
          alignItems={'flex-end'}
          ml={5}
        >
          <Flex
            height={'100%'}
            overflow={'auto'}
            flexDir={'column'}
            w={'100%'}
            gap={4}
            {...props}
          >
            <IconButton
              variant="outline"
              aria-label="Open Navbar"
              icon={<GiHamburgerMenu size={'12px'} />}
              onClick={navOnOpen}
              minW={'auto'}
              w={{ base: '30px', sm: '44px' }}
              h={{ base: '30px', sm: '44px' }}
            />
            {additionalNav}
          </Flex>
        </VStack>
        {/* NAVBAR */}
        <Drawer
          isOpen={navIsOpen}
          placement="right"
          onClose={navOnClose}
          size={'md'}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton rounded={'0'} textColor={'black'} />
            <DrawerBody>
              <NavLinks />
            </DrawerBody>

            <DrawerFooter as={'div'} display={'block'}>
              <Footer />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  )
}

export default Navbar
