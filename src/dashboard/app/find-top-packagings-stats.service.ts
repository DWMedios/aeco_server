import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { IProductStats } from '@common/domain/entities'
import type { PackgingStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import type { IFindTopPackagingsService } from '@dashboard/domain/services/IFindTopPackagingsService'

@Injectable()
export class FindTopPackagingsStatsService
  implements IFindTopPackagingsService
{
  logger = new Logger(FindTopPackagingsStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(filters: PackgingStatsFiltersDto): Promise<IProductStats[]> {
    const topPackagingsStats =
      await this.dashboardRepository.topPackagings(filters)

    if (!topPackagingsStats) {
      this.logger.error('Top packagings stats not found')
      throw new NotFoundException('Estatísticas de embalage no encontradas')
    }

    return topPackagingsStats
  }
}
