import type { ICompany } from './ICompany'

export interface IPackagingStats {
  readonly packagingType: string
  readonly totalCount: number
  readonly companyId?: number
  company?: ICompany
}
