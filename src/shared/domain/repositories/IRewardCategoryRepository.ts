import type { IRewardCategory } from '@common/domain/entities'
import type { CreateRewardCategoryDto } from '../../../reward-category/domain/dto/RewardCategoryDto'

export const REWARD_CATEGORY_REPOSITORY = Symbol('IRewardCategoryRepository')

export interface IRewardCategoryRepository {
  exists(filter: { id?: number; name?: string }): Promise<boolean>
  create(
    createRewardCategory: CreateRewardCategoryDto,
  ): Promise<IRewardCategory>
}
