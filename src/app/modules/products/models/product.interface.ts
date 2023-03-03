export interface IProduct {
  id: number
  attributes: Attributes
}

export interface Attributes {
  name: string
  description: string
  price: number
  category: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
