import type { IBase } from './IBase'
import type { ICompany } from './ICompany'

export interface ISetting extends IBase {
  key?: string
  metadata?: Record<string, any>[]
  companyId: number
  company?: ICompany
}
