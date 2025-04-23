import type { IBase } from './IBase'
import type { ICampaign } from './ICampaign'
import type { ICompany } from './ICompany'
import type { IContractor } from './IContractor'

export interface IAdvertising extends IBase {
  readonly isEnabled: boolean
  readonly companyId?: number
  readonly company?: ICompany
  readonly contractors?: IContractor[]
  readonly campaigns?: ICampaign[]
}
