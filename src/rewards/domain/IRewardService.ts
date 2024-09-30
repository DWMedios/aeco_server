import type { IReward } from '../../common/domain/entities/IReward'
import type { CreateRewardDto } from './dto/RewardDto'

export const REWARD_SERVICE = Symbol('IRewardService')

export interface IRewardService {
  create(createReward: CreateRewardDto): Promise<IReward>
}
