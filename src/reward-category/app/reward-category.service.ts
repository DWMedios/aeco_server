import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import type { IRewardCategory } from '../../common/domain/entities/IRewardCategory'
import {
  IRewardCategoryRepository,
  REWARD_CATEGORY_REPOSITORY,
} from '../../shared/domain/repositories/IRewardCategoryRepository'
import type { CreateRewardCategoryDto } from '../domain/dto/RewardCategoryDto'

@Injectable()
export class RewardCategoryService {
  constructor(
    @Inject(REWARD_CATEGORY_REPOSITORY)
    private readonly rewardCategoryRepository: IRewardCategoryRepository,
  ) {}

  async create(
    newRewardCategory: CreateRewardCategoryDto,
  ): Promise<IRewardCategory> {
    const exists = await this.rewardCategoryRepository.exists({
      name: newRewardCategory.name,
    })

    if (exists) throw new BadRequestException('Page already exists')

    return await this.rewardCategoryRepository.create(newRewardCategory)
  }
}
