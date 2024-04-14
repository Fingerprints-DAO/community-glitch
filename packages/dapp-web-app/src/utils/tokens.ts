export const getSmallTokenPath = (filename: string, version: string) =>
  `/arts/${filename}_${version}s.gif`

export const getFullTokenPath = (filename: string, version: string) =>
  `/edition/arts/${filename}_${version}.gif`
