import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { IDailyStats } from '@common/domain/entities'
import type { PackingsPerDayDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import type { IFindPackagingsPerDayService } from '@dashboard/domain/services/IFindPackagingsPerDayService'

@Injectable()
export class FindPackagingsPerDayStatsService
  implements IFindPackagingsPerDayService
{
  logger = new Logger(FindPackagingsPerDayStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(filters: PackingsPerDayDto): Promise<IDailyStats[]> {
    const packagingsPerDayStats =
      await this.dashboardRepository.totalPackingsPerDay(filters)

    if (!packagingsPerDayStats) {
      this.logger.error('Stats of packagings not found')
      throw new NotFoundException('Estatísticas de embalage no encontradas')
    }

    console.log('packagingsPerDayStats', packagingsPerDayStats)

    if (packagingsPerDayStats.length === 0) {
      this.logger.warn('No packagings found for the given filters')
      return []
    }
    return packagingsPerDayStats
  }
}
