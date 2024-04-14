import { Tr, Text } from '@chakra-ui/react'
import { TableCell } from '../TableCell'

export const TableRow = ({
  index,
  amount,
  address = '',
  isHighlighted,
}: {
  index?: number
  amount: string
  address?: string
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
    <TableCell>{address}</TableCell>
  </Tr>
)
