import type { IBase } from './IBase'
import type { IProduct } from './IProduct'

export interface IProductCapacity extends IBase {
  readonly packaging: string
  readonly weight: number
  readonly factor: number
  readonly description?: string
  products: IProduct[]
  totalProducts?: number
}
