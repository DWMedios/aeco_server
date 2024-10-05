import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { REWARD_CATEGORY_REPOSITORY } from '@domain-repositories'
import { RewardCategoryRepository } from '@infra-repositories'
import { RewardCategory } from '@infra-entities'
import { RewardCategoryController } from './infra/reward-category.controller'
import { REWARD_CATEGORY_SERVICE } from './domain/IRewardCategoryService'
import { RewardCategoryService } from './app/reward-category.service'

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
