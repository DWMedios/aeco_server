import type { IAeco } from './IAeco'
import type { ICompany } from './ICompany'
import type { IProduct } from './IProduct'

export interface IProductStats {
  readonly totalCount: number
  readonly productId?: number
  readonly companyId?: number
  readonly aecoId?: number
  product?: IProduct
  company?: ICompany
  aeco?: IAeco
}
