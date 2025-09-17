import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common'
import {
  DASHBOARD_REPOSITORY,
  PRODUCT_REPOSITORY,
  type IProductRepository,
  type IDashboardRepository,
  AECO_ATTEMPTS_REPOSITORY,
  type IAecoAttemptsRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { setDateToMidDayV2 } from '@shared/utils/functions'
import type { DecodedAeco } from '@shared/domain/Types'
import type { IAecoPayload } from '@aecos/domain/Types'
import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import type { IAecoAttempts, IProductStats } from '@common/domain/entities'
import type { RequestProductStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'
import type { IInsertProductStatsAecoService } from '@aecos/domain/services/iot-services/IInsertProductStatsAecoService'

@Injectable()
export class InsertProductStatsAecoService
  implements IInsertProductStatsAecoService
{
  logger = new Logger(InsertProductStatsAecoService.name)

  constructor(
    @Inject(DASHBOARD_REPOSITORY)
    private readonly dashboardRepository: IDashboardRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(AECO_ATTEMPTS_REPOSITORY)
    private readonly aecoAttemptsRepository: IAecoAttemptsRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: RequestProductStatsDto,
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

    const mapCreatedAt = stats.map((stat) => setDateToMidDayV2(stat.createdAt))

    if (mapCreatedAt.some((date) => date === null)) {
      await this.logAttempt(
        currentAeco.aecoSerialNumber,
        'Error al establecer alguna fecha',
        currentAeco.requestPayload,
      )
      this.logger.warn('Error al establecer alguna fecha')
      throw new BadRequestException('Error al establecer alguna fecha')
    }

    const mapProductIds = [...new Set(stats.map((stat) => stat.productId))]

    const products = await this.productRepository.findManyByIds(mapProductIds)

    if (products.length !== mapProductIds.length) {
      await this.logAttempt(
        currentAeco.aecoSerialNumber,
        'No se encontraron todos los productos',
        currentAeco.requestPayload,
      )
      this.logger.warn('No se encontraron todos los productos')
      throw new BadRequestException('No se encontraron todos los productos')
    }

    const mapStats = stats.map((stat) => ({
      ...stat,
      aecoId: currentAeco.aecoId,
      companyId: currentAeco.company.id,
      createdAt: setDateToMidDayV2(stat.createdAt),
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
        return newProductStats
      })

    return { success: productStatsTransaction.length > 0 ? true : false }
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
