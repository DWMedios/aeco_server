import type { IBase } from './IBase'
import type { IUser } from './IUser'
import type { IReward } from './IReward'
import type { ICompany } from './ICompany'
import type { ICampaign } from './ICampaign'
import type { IContractor } from './IContractor'

export interface IMediaAsset extends IBase {
  readonly fileKey: string
  readonly originalName: string
  readonly mimeType: string
  readonly fileSize: number
  readonly assetType: string
  campaignMedia?: ICampaign
  contractorLogo?: IContractor
  companyLogo?: ICompany
  rewardImage?: IReward
  userImage?: IUser
}
