import type { IReward } from '@domain-entities'
import type { CreateRewardDto } from '../../../rewards/domain/dto/RewardDto'

export const REWARD_REPOSITORY = Symbol('IRewardRepository')

export interface IRewardRepository {
  exists(filter: { id?: number; name?: string }): Promise<boolean>
  create(createReward: CreateRewardDto): Promise<IReward>
}
