import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { setDateToMidDay } from '@shared/utils/functions'
import type { DecodedAeco } from '@shared/domain/Types'
import type { IProductStats } from '@common/domain/entities'
import type { RequestProductStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'
import type { IInsertProductStatsAecoService } from '@aecos/domain/services/IInsertProductStatsAecoService'

@Injectable()
export class InsertProductStatsAecoService
  implements IInsertProductStatsAecoService
{
  logger = new Logger(InsertProductStatsAecoService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: RequestProductStatsDto,
  ): Promise<{ success: boolean }> {
    const { stats } = request

    if (!stats || stats.length === 0) {
      throw new NotFoundException('No hay estadísticas para insertar')
    }

    const mapCreatedAt = stats.map((stat) => setDateToMidDay(stat.createdAt))

    if (mapCreatedAt.some((date) => date === null)) {
      throw new NotFoundException('Error al establecer alguna fecha')
    }

    const mapStats = stats.map((stat) => ({
      ...stat,
      aecoId: currentAeco.aecoId,
      companyId: currentAeco.company.id,
      createdAt: setDateToMidDay(stat.createdAt),
    }))

    const productStatsTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let newProductStats: IProductStats[] = []
        try {
          newProductStats = await this.dashboardRepository.insertProductStats(
            mapStats,
            manager,
          )
        } catch (error) {
          throw new NotFoundException('Error al crear las estadísticas', error)
        }
        return newProductStats
      })

    return { success: productStatsTransaction.length > 0 ? true : false }
  }
}
