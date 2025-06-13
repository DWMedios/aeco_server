import type { IReward } from '@common/domain/entities'
import type { UpdateRewardDto } from '../dto/UpdateReward.dto'

export const UPDATE_REWARD_SERVICE = Symbol('IUpdateRewardService')

export interface IUpdateRewardService {
  run(rewardId: number, request: UpdateRewardDto): Promise<IReward>
}
