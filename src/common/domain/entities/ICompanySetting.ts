import type { IBase } from './IBase'
import type { ICompany } from './ICompany'

export interface ISetting extends IBase {
  logoUrl: string
  metadata: Record<string, any>[]
  companyId: number
  company: ICompany
}
