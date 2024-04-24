export interface TokenMetadata {
  name: string
  background_color: string
  image: string
  external_url: string
  description: string
  attributes: Attribute[]
}

export interface Attribute {
  trait_type: string
  value: string
  display_type?: string
}
