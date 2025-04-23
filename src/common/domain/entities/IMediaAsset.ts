import type { IBase } from './IBase'
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
}
