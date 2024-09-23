import { Module } from '@nestjs/common';
import { RewardCategoryController } from './reward-category.controller';
import { RewardCategoryService } from './reward-category.service';

@Module({
  controllers: [RewardCategoryController],
  providers: [RewardCategoryService]
})
export class RewardCategoryModule {}
