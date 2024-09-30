import { ICompany } from './ICompany'

export interface ISetting {
  logoUrl: string
  metadata: Record<string, any>[]
  companyId: number
  company: ICompany
}
