import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { RewardsController } from './infra/rewards.controller'
import { REWARD_SERVICE } from './domain/IRewardService'
import { RewardService } from './app/rewards.service'

Module({
  imports: [SharedModule],
  controllers: [RewardsController],
  providers: [
    {
      provide: REWARD_SERVICE,
      useClass: RewardService,
    },
  ],
})
export class RewardsModule {}
