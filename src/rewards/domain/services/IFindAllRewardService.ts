import type { IReward } from '@common/domain/entities'
import type { RewardFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_REWARD_SERVICE = Symbol('IFindAllRewardService')

export interface IFindAllRewardService {
  run(filters: RewardFiltersDto): Promise<PageMetaDto<IReward>>
}
