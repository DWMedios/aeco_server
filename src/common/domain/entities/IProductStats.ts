import type { ICompany } from './ICompany'
import type { IProduct } from './IProduct'

export interface IProductStats {
  readonly totalCount: number
  readonly productId?: number
  readonly companyId?: number
  product?: IProduct
  company?: ICompany
}
