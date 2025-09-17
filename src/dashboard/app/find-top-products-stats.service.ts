import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { ITopProductResult } from '@common/domain/entities'
import type { TopStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import type { IFindTopProductsService } from '@dashboard/domain/services/IFindTopProductsService'

@Injectable()
export class FindTopProductsStatsService implements IFindTopProductsService {
  logger = new Logger(FindTopProductsStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(filters: TopStatsFiltersDto): Promise<ITopProductResult[]> {
    const topProductsStats = await this.dashboardRepository.topProducts(filters)

    if (!topProductsStats) {
      this.logger.error('Top products stats not found')
      throw new NotFoundException('Estatísticas de productos no encontradas')
    }

    return topProductsStats
  }
}
