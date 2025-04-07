import type { PackingType } from '../Types'
import type { ICompany } from './ICompany'

export interface IPackagingStats {
  readonly packagingType: PackingType
  readonly totalCount: number
  readonly companyId?: number
  company?: ICompany
}
