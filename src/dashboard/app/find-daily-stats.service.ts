import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { IDailyStats } from '@common/domain/entities'

@Injectable()
export class FindDailyStatsService {
  logger = new Logger(FindDailyStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(companyId?: number): Promise<IDailyStats> {
    const dailyStats = await this.dashboardRepository.dailyStats(companyId)

    if (!dailyStats) {
      this.logger.error('Daily stats not found')
      throw new NotFoundException('Estatísticas diárias not encontradas')
    }

    return dailyStats
  }
}
