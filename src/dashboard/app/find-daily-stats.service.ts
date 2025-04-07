import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { IDailyStats } from '@common/domain/entities'
import type { DailyStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import type { IFindDailyStatsService } from '@dashboard/domain/services/IFindDailyStatsService'

@Injectable()
export class FindDailyStatsService implements IFindDailyStatsService {
  logger = new Logger(FindDailyStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(filters: DailyStatsFiltersDto): Promise<IDailyStats> {
    console.log('filters', filters)
    const dailyStats = await this.dashboardRepository.dailyStats(filters)

    console.log('dailyStats', dailyStats)

    if (!dailyStats) {
      this.logger.error('Daily stats not found')
      throw new NotFoundException('Estatísticas diárias no encontradas')
    }

    return {
      totalTickets: dailyStats?.totalTickets ?? 0,
      totalBottles: dailyStats?.totalBottles ?? 0,
      totalCans: dailyStats?.totalCans ?? 0,
    }
  }
}
