import {
  Box,
  Text,
  Button,
  CloseButton,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react'
import useTxToast from 'hooks/use-tx-toast'
import { useEffect, useState } from 'react'
import { useWaitForTransactionReceipt } from 'wagmi'
import { redirect } from 'next/navigation'
import { useWriteGlitchBurnToReedem } from 'web3/contract-functions'

export const BurnModal = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [code, setCode] = useState<number>()
  const [isMobile] = useMediaQuery('(max-width: 1023px)')
  const { showTxSentToast, showTxErrorToast, showTxExecutedToast } =
    useTxToast()
  const burn = useWriteGlitchBurnToReedem()
  const burnTx = useWaitForTransactionReceipt({
    hash: burn?.data,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 8) return

    setCode(Number(e.target.value))
  }

  const handleBurn = async () => {
    if (!code) return
    await burn.writeContractAsync(
      { args: [BigInt(id), BigInt(code)] },
      {
        onSuccess: (data) => {
          showTxSentToast('burn-sent', data)
          onClose()
        },
        onError: (error) => {
          showTxErrorToast(error ?? `Tx could not be sent`)
        },
      },
    )
  }

  useEffect(() => {
    if (burn.data && burnTx.isSuccess) {
      showTxExecutedToast({ id: 'burn-executed', txHash: burn.data })
      redirect('/')
    }
    if (burn.data && burnTx.isError)
      showTxErrorToast(burnTx?.failureReason ?? `Tx failed`)
  }, [
    burn,
    burnTx?.failureReason,
    burnTx.isError,
    burnTx.isSuccess,
    showTxErrorToast,
    showTxExecutedToast,
  ])

  return (
    <>
      <Button onClick={onOpen}>i have the code and want to proceed</Button>
      {isOpen && (
        <Modal
          isCentered={true}
          isOpen={true}
          scrollBehavior={'outside'}
          motionPreset={isMobile ? 'slideInBottom' : 'scale'}
          onClose={onClose}
          size={'lg'}
        >
          <ModalOverlay height="100vh" />
          <ModalContent
            bg="white"
            position={{ base: 'fixed', sm: 'unset' }}
            bottom={{ base: '0px', sm: 'unset' }}
            mb={{ base: '0', sm: 'auto' }}
            rounded={'none'}
            border={'1px solid black'}
            p={6}
            overflow={{ base: 'auto', md: 'initial' }}
          >
            <Box position="relative" py="13px" mb={2}>
              <Text as={'h2'} fontSize="lg" fontWeight="bold" lineHeight="24px">
                enter the code to burn
              </Text>
              <CloseButton
                color="gray.500"
                onClick={onClose}
                position="absolute"
                right={0}
                top={0}
                w="44px"
                h="44px"
                size="lg"
                rounded={'none'}
              />
            </Box>
            <Box>
              <Text mb={0}>
                Once you send the transaction to burn the token, it can not be
                reversed, refunded or returned.
              </Text>
              <Input
                placeholder={'Insert the code here'}
                size={'md'}
                colorScheme="blackAlpha"
                type="number"
                onChange={handleChange}
                value={code}
                textAlign={'left'}
                mt={6}
                maxLength={8}
                required
                isDisabled={burn.data && burnTx.isPending}
              />
            </Box>
            <ModalFooter gap={4} px={0} pt={8}>
              <Button
                onClick={onClose}
                variant={'outline'}
                isLoading={burn.isPending}
              >
                cancel
              </Button>
              <Button
                onClick={handleBurn}
                isLoading={burn.isPending}
                isDisabled={!code || code.toString().length < 8}
              >
                burn now
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
