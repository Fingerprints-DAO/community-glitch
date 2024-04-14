const TRUNCATED_NAME_CHAR_LIMIT = 11

export const pluralize = (
  quantity: number,
  singular: string,
  plural: string,
): string => `${quantity} ${quantity === 1 ? singular : plural}`

export const shortenAddress = (address = '', startCount = 5, lastCount = 3) => {
  if (address.length < TRUNCATED_NAME_CHAR_LIMIT) {
    return address
  }

  return `${address.slice(0, startCount)}...${address.slice(-lastCount)}`
}

export const isUserAddress = (userAddress = '', address = '') =>
  userAddress.toLowerCase() === address.toLowerCase()
