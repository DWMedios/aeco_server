import { Module } from '@nestjs/common'
import { RewardsController } from './infra/rewards.controller'
import { RewardsService } from './app/rewards.service'

@Module({
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
