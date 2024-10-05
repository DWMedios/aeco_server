import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { REWARD_REPOSITORY } from '@domain-repositories'
import { RewardRepository } from '@infra-repositories'
import { Reward } from '@infra-entities'
import { RewardsController } from './infra/rewards.controller'
import { REWARD_SERVICE } from './domain/IRewardService'
import { RewardService } from './app/rewards.service'

Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardsController],
  providers: [
    {
      provide: REWARD_SERVICE,
      useClass: RewardService,
    },
    {
      provide: REWARD_REPOSITORY,
      useClass: RewardRepository,
    },
  ],
})
export class RewardsModule {}
