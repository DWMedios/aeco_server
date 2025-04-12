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
import type { IDailyStats } from '@common/domain/entities'
import type { CreateDailyStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'
import type { IInsertDailyStatsAecoService } from '@aecos/domain/services/IInsertDailyStatsAecoService'

@Injectable()
export class InsertDailyStatsAecoService
  implements IInsertDailyStatsAecoService
{
  logger = new Logger(InsertDailyStatsAecoService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: CreateDailyStatsDto,
  ): Promise<{ success: boolean }> {
    const createdAt = setDateToMidDay(request.createdAt)

    if (!createdAt) {
      throw new NotFoundException('Error al establecer la fecha')
    }

    const stats: Partial<IDailyStats> = {
      ...request,
      aecoId: currentAeco.aecoId,
      companyId: currentAeco.company.id,
      createdAt,
    }

    const dailyStatsTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let newDailyStats: IDailyStats | null = null
        try {
          newDailyStats = await this.dashboardRepository.insertDailyStats(
            stats,
            manager,
          )
        } catch (error) {
          throw new InternalServerErrorException(
            'Error al crear las estadísticas',
            error,
          )
        }
        return newDailyStats
      })

    return { success: !!dailyStatsTransaction }
  }
}
