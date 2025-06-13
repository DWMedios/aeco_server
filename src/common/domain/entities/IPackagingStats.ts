import type { IAeco } from './IAeco'
import type { ICompany } from './ICompany'
import type { PackingType } from '../Types'

export interface IPackagingStats {
  readonly packagingType: PackingType
  readonly totalCount: number
  readonly companyId?: number
  readonly aecoId?: number
  company?: ICompany
  aeco?: IAeco
}
