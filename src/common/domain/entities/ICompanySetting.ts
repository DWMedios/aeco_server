import type { IBase } from './IBase'
import type { ICompany } from './ICompany'

export interface ISetting extends IBase {
  readonly key?: string
  metadata?: Record<string, any>[]
  readonly companyId?: number
  company?: ICompany
}
