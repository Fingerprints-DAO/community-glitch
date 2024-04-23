import { Box, Text } from '@chakra-ui/react'

interface TotalPriceDisplayProps {
  selectedItemsCount: number
  price: number
  hasDiscount: boolean
  priceWithDiscount: number
}

const TotalPriceDisplay: React.FC<TotalPriceDisplayProps> = ({
  selectedItemsCount,
  hasDiscount,
  price,
  priceWithDiscount,
}) => {
  const itemCount = selectedItemsCount
  const totalPrice = itemCount * price
  const discountedPrice = itemCount * priceWithDiscount
  const showDiscount = hasDiscount && itemCount > 0

  return (
    <Box fontSize={'xs'} fontWeight={'bold'}>
      Total:{' '}
      <Text
        as={'span'}
        textDecor={showDiscount ? 'line-through' : 'none'}
        textColor={showDiscount ? 'gray.400' : 'black'}
      >
        {totalPrice.toFixed(3)} ETH
      </Text>{' '}
      {showDiscount && (
        <Text as={'span'} textColor={'black'}>
          {discountedPrice.toFixed(5)} ETH
        </Text>
      )}
    </Box>
  )
}

export default TotalPriceDisplay
