import {
  Injectable,
  Inject,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common'
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
import type { IPackagingStats } from '@common/domain/entities'
import type { RequestPackagingStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'
import type { IInsertPackagingStatsAecoService } from '@aecos/domain/services/IInsertPackagingStatsAecoService'

@Injectable()
export class InsertPackagingStatsAecoService
  implements IInsertPackagingStatsAecoService
{
  logger = new Logger(InsertPackagingStatsAecoService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: RequestPackagingStatsDto,
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

    const packagingStatsTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let newPackagingStats: IPackagingStats[] = []
        try {
          newPackagingStats =
            await this.dashboardRepository.insertPackagingStats(
              mapStats,
              manager,
            )
        } catch (error) {
          throw new InternalServerErrorException(
            'Error al crear las estadísticas',
            error,
          )
        }
        return newPackagingStats
      })

    return { success: packagingStatsTransaction.length > 0 ? true : false }
  }
}
