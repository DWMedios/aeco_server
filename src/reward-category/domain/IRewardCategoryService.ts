import type { IRewardCategory } from '../../common/domain/entities/IRewardCategory'
import type { CreateRewardCategoryDto } from './dto/RewardCategoryDto'

export const REWARD_CATEGORY_SERVICE = Symbol('IRewardCategoryService')

export interface IRewardService {
  create(createReward: CreateRewardCategoryDto): Promise<IRewardCategory>
}
