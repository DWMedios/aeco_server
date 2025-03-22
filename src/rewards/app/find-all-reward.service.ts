import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '@shared/domain/repositories'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IReward } from '@common/domain/entities'
import type { RewardFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IFindAllRewardService } from '@rewards/domain/services/IFindAllRewardService'

@Injectable()
export class FindAllRewardService implements IFindAllRewardService {
  logger = new Logger(FindAllRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
  ) {}

  async run(filters: RewardFiltersDto): Promise<PageMetaDto<IReward>> {
    try {
      const [entities, total] = await this.rewardRepository.findAll(filters)

      return new PageMetaDto<IReward>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new NotFoundException('No se pudo obtener las recompensas')
    }
  }
}
