import type { IRewardCategory } from '@domain-entities'
import type { CreateRewardCategoryDto } from './dto/RewardCategoryDto'

export const REWARD_CATEGORY_SERVICE = Symbol('IRewardCategoryService')

export interface IRewardCategoryService {
  create(createReward: CreateRewardCategoryDto): Promise<IRewardCategory>
}
