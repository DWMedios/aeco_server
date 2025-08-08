import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '@shared/domain/repositories'
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { DecodedUser } from '@shared/domain/Types'
import type { IReward } from '@common/domain/entities'
import type { RewardFiltersDto } from '@rewards/domain/dto/Filters.dto'
import type { IFindAllRewardService } from '@rewards/domain/services/IFindAllRewardService'

@Injectable()
export class FindAllRewardService implements IFindAllRewardService {
  logger = new Logger(FindAllRewardService.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
  ) {}

  async run(
    currentUser: DecodedUser,
    filters: RewardFiltersDto,
  ): Promise<PageMetaDto<IReward>> {
    let companyId: number | null = null
    const isSuperAdmin = currentUser.roleType === UserRoleEntityEnum.SUPER_ADMIN

    if (!isSuperAdmin) {
      companyId = currentUser.company.id
    }

    try {
      const [entities, total] = await this.rewardRepository.findAll(
        filters,
        companyId,
      )

      return new PageMetaDto<IReward>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'No se pudo obtener las recompensas',
      )
    }
  }
}
