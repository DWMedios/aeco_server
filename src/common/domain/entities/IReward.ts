import type { IAeco } from './IAeco'
import type { IBase } from './IBase'
import type { ICompany } from './ICompany'
import type { IMediaAsset } from './IMediaAsset'
import type { RewardTypeEnum } from '../enums/RewardType.enum'

export interface IReward extends IBase {
  readonly name: string
  readonly establishment?: string
  readonly description?: string
  readonly note?: string
  readonly status: boolean
  readonly type: RewardTypeEnum
  readonly order: number
  metadata: Record<string, any>
  readonly companyId?: number
  readonly imageId?: number
  readonly company?: ICompany
  aecos?: IAeco[]
  mediaAsset?: IMediaAsset
  totalAecos?: number
}
