import { IReward } from 'src/common/domain/entities/IReward';
import { CreateRewardDto } from 'src/rewards/domain/dto/RewardDto';

export const REWARD_REPOSITORY = Symbol('IRewardRepository');

export interface IRewardRepository {
  exists(filter: { id?: number; name?: string }): Promise<boolean>;
  create(createReward: CreateRewardDto): Promise<IReward>;
}
