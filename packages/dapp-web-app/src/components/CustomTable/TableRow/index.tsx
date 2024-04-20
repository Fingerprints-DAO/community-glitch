import { Tr, Text } from '@chakra-ui/react'
import { TableCell } from '../TableCell'
import { TextToltip } from 'components/TextTooltip'

export const TableRow = ({
  index,
  amount,
  address = '',
  fullAddress = '',
  isHighlighted,
}: {
  index?: number
  amount: string
  address?: string
  fullAddress?: string
  isHighlighted?: boolean
}) => (
  <Tr
    fontWeight={isHighlighted ? 'bold' : 'normal'}
    textDecor={!index ? 'line-through' : undefined}
  >
    <TableCell width={'35px'} pr={2}>
      {!index ? '-' : index + '.'}
    </TableCell>
    <TableCell width={'100px'} pr={4}>
      <Text as={'span'} fontSize={'10px'} mr={2}>
        Ξ
      </Text>
      {amount}
    </TableCell>
    <TableCell>
      <TextToltip label={fullAddress} isDisabled={fullAddress.length < 1}>
        {address}
      </TextToltip>
    </TableCell>
  </Tr>
)
