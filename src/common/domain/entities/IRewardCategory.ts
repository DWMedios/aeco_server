import type { IBase } from './IBase'
import type { IAeco } from './IAeco'
import type { IReward } from './IReward'

export interface IRewardCategory extends IBase {
  name: string
  status: boolean
  order: number
  aecoId: number
  aeco: IAeco
  rewards: IReward[]
}
