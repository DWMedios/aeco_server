import type { IBase } from './IBase'
import type { IAdvertising } from './IAdvertising'
import type { ICampaign } from './ICampaign'
import type { ICompany } from './ICompany'
import type { IMediaAsset } from './IMediaAsset'

export interface IContractor extends IBase {
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly logoId?: number
  readonly companyId?: number
  company?: ICompany
  campaigns?: ICampaign[]
  mediaAsset?: IMediaAsset
  advertisings?: IAdvertising[]
}
