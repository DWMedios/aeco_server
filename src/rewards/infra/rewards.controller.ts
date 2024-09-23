import { Body, Controller, Inject, Post } from '@nestjs/common';
import { IRewardService, REWARD_SERVICE } from '../domain/IRewardService';
import type { CreateRewardDto } from '../domain/dto/RewardDto';

@Controller('rewards')
export class RewardsController {
  constructor(
    @Inject(REWARD_SERVICE)
    private readonly rewardService: IRewardService,
  ) {}

  @Post()
  async create(@Body() createReward: CreateRewardDto) {
    return await this.rewardService.create(createReward);
  }
}
