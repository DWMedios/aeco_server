import type { RewardTypeEnum } from '../enums/RewardType.enum'
import type { IAeco } from './IAeco'
import type { IBase } from './IBase'
import type { ICompany } from './ICompany'

export interface IReward extends IBase {
  readonly name: string
  readonly establishment?: string
  readonly description?: string
  readonly note?: string
  readonly image?: string
  readonly status: boolean
  readonly type: RewardTypeEnum
  readonly order: number
  metadata: Record<string, any>
  readonly companyId?: number
  readonly company?: ICompany
  aecos?: IAeco[]
  totalAecos?: number
}
