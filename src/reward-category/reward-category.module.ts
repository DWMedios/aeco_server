import { Module } from '@nestjs/common'
import { RewardCategoryController } from './infra/reward-category.controller'
import { RewardCategoryService } from './app/reward-category.service'

@Module({
  controllers: [RewardCategoryController],
  providers: [RewardCategoryService],
})
export class RewardCategoryModule {}
