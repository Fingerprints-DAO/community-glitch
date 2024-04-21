const ipfsPath =
  'https://ipfs.io/ipfs/QmYU6QY5Pt9MoMsKZ7ay7TPEsTYf9UXJv6KFRwzLWu5utj'

export const getSmallTokenPath = (filename: string, version: string) =>
  `${ipfsPath}/NFT_v2-small/${filename}_${version}s.gif`

export const getFullTokenPath = (filename: string, version: string) =>
  `${ipfsPath}/NFT_v2/${filename}_${version}.gif`
