import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import type { IReward } from '../../common/domain/entities/IReward'
import type { CreateRewardDto } from '../domain/dto/RewardDto'
import type { IRewardService } from '../domain/IRewardService'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '../../shared/domain/repositories/IRewardRepository'

@Injectable()
export class RewardService implements IRewardService {
  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
  ) {}

  async create(newReward: CreateRewardDto): Promise<IReward> {
    const exists = await this.rewardRepository.exists({
      name: newReward.name,
    })

    if (exists) throw new BadRequestException('Reward already exists')

    return await this.rewardRepository.create(newReward)
  }
}
