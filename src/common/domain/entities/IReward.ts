import type { IBase } from './IBase'
import type { IRewardCategory } from './IRewardCategory'

export interface IReward extends IBase {
  name: string
  image: string
  order: number
  status: boolean
  metadata: Record<string, any>[]
  categoryId: number
  category: IRewardCategory
}
