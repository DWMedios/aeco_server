import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import type { IProductStats } from '@common/domain/entities'

@Injectable()
export class FindTopPackagingsStatsService {
  logger = new Logger(FindTopPackagingsStatsService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
  ) {}

  async run(
    limit: number,
    orderBy: 'ASC' | 'DESC',
    companyId?: number,
  ): Promise<IProductStats[]> {
    const topPackagingsStats = await this.dashboardRepository.topPackagings(
      limit,
      orderBy,
      companyId,
    )

    if (!topPackagingsStats) {
      this.logger.error('Top packagings stats not found')
      throw new NotFoundException('Estatísticas de embalagens not encontradas')
    }

    return topPackagingsStats
  }
}
