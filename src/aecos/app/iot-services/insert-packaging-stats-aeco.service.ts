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
import type { IAecoAttempts, IPackagingStats } from '@common/domain/entities'
import type { RequestPackagingStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'
import type { IInsertPackagingStatsAecoService } from '@aecos/domain/services/iot-services/IInsertPackagingStatsAecoService'

@Injectable()
export class InsertPackagingStatsAecoService
  implements IInsertPackagingStatsAecoService
{
  logger = new Logger(InsertPackagingStatsAecoService.name)

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
    request: RequestPackagingStatsDto,
  ): Promise<{ success: boolean }> {
    const { stats } = request

    if (!stats || stats.length === 0) {
      await this.logAttempt(
        currentAeco.aecoSerialNumber,
        'No hay estadísticas para insertar',
        currentAeco.requestPayload,
      )
      this.logger.warn('No hay estadísticas para insertar')
      throw new BadRequestException('No hay estadísticas para insertar')
    }

    const mapCreatedAt = stats.map((stat) => setDateToMidDay(stat.createdAt))

    if (mapCreatedAt.some((date) => date === null)) {
      await this.logAttempt(
        currentAeco.aecoSerialNumber,
        'Error al establecer alguna fecha',
        currentAeco.requestPayload,
      )
      this.logger.error('Error al establecer alguna fecha')
      throw new BadRequestException('Error al establecer alguna fecha')
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
          await this.logAttempt(
            currentAeco.aecoSerialNumber,
            'Error al crear las estadísticas: ' + error.stack,
            currentAeco.requestPayload,
          )
          this.logger.error('Error al crear las estadísticas', error.stack)
          throw new InternalServerErrorException(
            'Error al crear las estadísticas',
            error,
          )
        }
        return newPackagingStats
      })

    return { success: packagingStatsTransaction.length > 0 ? true : false }
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
