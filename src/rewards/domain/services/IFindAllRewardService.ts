import type { IReward } from '@common/domain/entities'
import type { DecodedUser } from '@shared/domain/Types'
import type { RewardFiltersDto } from '@rewards/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_REWARD_SERVICE = Symbol('IFindAllRewardService')

export interface IFindAllRewardService {
  run(
    currentUser: DecodedUser,
    filters: RewardFiltersDto,
  ): Promise<PageMetaDto<IReward>>
}
