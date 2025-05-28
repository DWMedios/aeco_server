import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import {
  AECO_ATTEMPTS_REPOSITORY,
  DASHBOARD_REPOSITORY,
  type IAecoAttemptsRepository,
  type IDashboardRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { setDateToMidDay } from '@shared/utils/functions'
import type { DecodedAeco } from '@shared/domain/Types'
import type { IAecoPayload } from '@aecos/domain/Types'
import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import type { IAecoAttempts, IDailyStats } from '@common/domain/entities'
import type { CreateDailyStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'
import type { IInsertDailyStatsAecoService } from '@aecos/domain/services/iot-services/IInsertDailyStatsAecoService'

@Injectable()
export class InsertDailyStatsAecoService
  implements IInsertDailyStatsAecoService
{
  logger = new Logger(InsertDailyStatsAecoService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(AECO_ATTEMPTS_REPOSITORY)
    private readonly aecoAttemptsRepository: IAecoAttemptsRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: CreateDailyStatsDto,
  ): Promise<{ success: boolean }> {
    const { requestPayload } = currentAeco
    const createdAt = setDateToMidDay(request.createdAt)

    if (!createdAt) {
      await this.logAttempt(
        currentAeco.aecoSerialNumber,
        'Error al establecer la fecha',
        requestPayload,
      )
      throw new BadRequestException('Error al establecer la fecha')
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
          await this.logAttempt(
            currentAeco.aecoSerialNumber,
            'Error al crear las estadísticas: ' + error.stack,
            requestPayload,
          )
          throw new InternalServerErrorException(
            'Error al crear las estadísticas',
            error,
          )
        }
        return newDailyStats
      })

    return { success: !!dailyStatsTransaction }
  }

  private async logAttempt(
    serialNumber: string,
    errorMessage: string,
    requestPayload: IAecoPayload,
  ) {
    const data: Partial<IAecoAttempts> = {
      serialNumber,
      ipAddress: requestPayload.ipAddress || 'UNKNOWN',
      reason: AecoAttemptsEnum.SERVICE_ERROR,
      requestData: requestPayload,
      errorMessage,
      geolocation: requestPayload.geolocation || {
        latitude: '0',
        longitude: '0',
      },
    }
    try {
      await this.aecoAttemptsRepository.create(data)
    } catch (error) {
      this.logger.error('Failed to save attempt log', error.stack)
    }
  }
}
