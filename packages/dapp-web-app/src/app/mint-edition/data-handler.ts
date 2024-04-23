import dayjs from 'dayjs'
import { formatEther } from 'ethers'
import { MintConfig } from 'types/mint'

export const handleMintConfig = (config: MintConfig) => {
  return {
    startTime: Number(config.startTime),
    endTime: Number(config.endTime),
    price: Number(formatEther(config.price)),
    priceWithDiscount: Number(formatEther(config.priceWithDiscount)),
  }
}

export type HandledMintConfig = ReturnType<typeof handleMintConfig>

export const defaultMintConfig: ReturnType<typeof handleMintConfig> = {
  startTime: dayjs().valueOf(),
  endTime: dayjs().valueOf(),
  price: 0.025,
  priceWithDiscount: 0.02125,
}

export const handleMintConfigToDayJs = (config: HandledMintConfig) => {
  return {
    ...config,
    startTime: dayjs.unix(config.startTime),
    endTime: dayjs.unix(config.endTime),
  }
}
export type HandledMintConfigToDayJs = ReturnType<
  typeof handleMintConfigToDayJs
>

export const defaultMintConfigDayJs: ReturnType<
  typeof handleMintConfigToDayJs
> = {
  startTime: dayjs(),
  endTime: dayjs(),
  price: 0.025,
  priceWithDiscount: 0.02125,
}
