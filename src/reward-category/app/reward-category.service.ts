import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import type { IRewardCategory } from '../../common/domain/entities/IRewardCategory'
import type { CreateRewardCategoryDto } from '../domain/dto/RewardCategoryDto'
import type { IRewardCategoryService } from '../domain/IRewardCategoryService'
import {
  REWARD_CATEGORY_REPOSITORY,
  type IRewardCategoryRepository,
} from '../../shared/domain/repositories/IRewardCategoryRepository'

@Injectable()
export class RewardCategoryService implements IRewardCategoryService {
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

    if (exists) throw new BadRequestException('Category already exists')

    return await this.rewardCategoryRepository.create(newRewardCategory)
  }
}
