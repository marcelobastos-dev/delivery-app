export interface IOrder {
  id: number
  attributes: Attributes
}

export interface Attributes {
  customerInfo: CustomerInfo
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface CustomerInfo {
  name: string
  phone: string
  address: string
}
