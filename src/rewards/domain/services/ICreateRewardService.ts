import type { IReward } from '@common/domain/entities'
import type { CreateRewardDto } from '../dto/CreateReward.dto'

export const CREATE_REWARD_SERVICE = Symbol('ICreateRewardService')

export interface ICreateRewardService {
  run(request: CreateRewardDto): Promise<IReward>
}
