import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RewardCategoryController } from './infra/reward-category.controller'
import { RewardCategoryService } from './app/reward-category.service'
import { REWARD_CATEGORY_SERVICE } from './domain/IRewardCategoryService'
import { REWARD_CATEGORY_REPOSITORY } from '../shared/domain/repositories/IRewardCategoryRepository'
import { RewardCategoryRepository } from '../shared/infra/repositories/RewardCategoryRepository'
import { RewardCategory } from '../common/infra/entities/RewardCategory.entity'

@Module({
  imports: [TypeOrmModule.forFeature([RewardCategory])],
  controllers: [RewardCategoryController],
  providers: [
    {
      provide: REWARD_CATEGORY_SERVICE,
      useClass: RewardCategoryService,
    },
    {
      provide: REWARD_CATEGORY_REPOSITORY,
      useClass: RewardCategoryRepository,
    },
  ],
})
export class RewardCategoryModule {}
