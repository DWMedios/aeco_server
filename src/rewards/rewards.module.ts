import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RewardsController } from './infra/rewards.controller'
import { RewardService } from './app/rewards.service'
import { REWARD_SERVICE } from './domain/IRewardService'
import { REWARD_REPOSITORY } from '../shared/domain/repositories/IRewardRepository'
import { RewardRepository } from '../shared/infra/repositories/RewardRepository'
import { Reward } from '../common/infra/entities/Reward.entity'

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
