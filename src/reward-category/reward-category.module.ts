import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { RewardCategoryController } from './infra/reward-category.controller'
import { REWARD_CATEGORY_SERVICE } from './domain/IRewardCategoryService'
import { RewardCategoryService } from './app/reward-category.service'

@Module({
  imports: [SharedModule],
  controllers: [RewardCategoryController],
  providers: [
    {
      provide: REWARD_CATEGORY_SERVICE,
      useClass: RewardCategoryService,
    },
  ],
})
export class RewardCategoryModule {}
