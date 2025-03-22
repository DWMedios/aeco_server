import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '@shared/domain/repositories'
import type { IReward } from '@common/domain/entities'
import type { IFindRewardService } from '@rewards/domain/services/IFindRewardService'

@Injectable()
export class FindRewardService implements IFindRewardService {
  logger = new Logger(FindRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
  ) {}

  async run(id: number): Promise<IReward> {
    const reward = await this.rewardRepository.findById(id)

    if (!reward) throw new NotFoundException('La recompensa no existe')

    return reward
  }
}
