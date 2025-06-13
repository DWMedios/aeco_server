import type { IReward } from '@common/domain/entities'

export const FIND_REWARD_SERVICE = Symbol('IFindRewardService')

export interface IFindRewardService {
  run(id: number): Promise<IReward & { imageUrl?: string }>
}
