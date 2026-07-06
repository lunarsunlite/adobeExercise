export interface BulkPricing {
  amount: number
  totalPrice: number
}

export interface Product {
  id: number
  name: string
  imageURL: string
  price: number
  bulkPricing: BulkPricing | null
}

export interface CartItem {
  productId: number
  quantity: number
}
