import type { IBase } from './IBase'
import type { IAeco } from './IAeco'
import type { ICompany } from './ICompany'
import type { IAdvertising } from './IAdvertising'
import type { IContractor } from './IContractor'
import type { IMediaAsset } from './IMediaAsset'

export interface ICampaign extends IBase {
  readonly contractName: string
  readonly description: string
  readonly startDate: Date
  readonly endDate: Date
  readonly isEnabled: boolean
  readonly planDescription?: string
  readonly reproductionLimit?: number
  readonly planDurationDays?: number
  readonly mediaId?: number
  readonly contractorId?: number
  readonly companyId?: number
  mediaAsset?: IMediaAsset
  contractor?: IContractor
  company?: ICompany
  aecos?: IAeco[]
  advertisings?: IAdvertising[]
}
