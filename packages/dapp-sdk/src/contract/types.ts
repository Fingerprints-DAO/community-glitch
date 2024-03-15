export interface ContractAddress {
  ERC20Mock: string
  chainId: number
}

export interface Contracts {}

export enum ChainId {
  Mainnet = 1,
  Goerli = 5,
  BaseGoerli = 84531,
  Hardhat = 31337,
}
