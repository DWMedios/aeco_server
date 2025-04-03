import type { IProduct } from './IProduct'

export interface IProductStats {
  readonly totalCount: number
  readonly productId?: number
  product?: IProduct
}
