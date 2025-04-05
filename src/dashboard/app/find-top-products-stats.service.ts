import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { IProductStats } from '@common/domain/entities'

@Injectable()
export class FindTopProductsStatsService {
  logger = new Logger(FindTopProductsStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(
    limit: number,
    orderBy: 'ASC' | 'DESC',
    companyId?: number,
  ): Promise<IProductStats[]> {
    const topProductsStats = await this.dashboardRepository.topProducts(
      limit,
      orderBy,
      companyId,
    )

    if (!topProductsStats) {
      this.logger.error('Top products stats not found')
      throw new NotFoundException('Estatísticas de productos no encontradas')
    }

    return topProductsStats
  }
}
