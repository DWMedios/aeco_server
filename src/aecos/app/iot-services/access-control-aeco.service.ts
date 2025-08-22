import { Injectable, Inject, Logger } from '@nestjs/common'
import {
  // AECO_REQUEST_HISTORY_REPOSITORY,
  // type IAecoRequestHistoryRepository,
  AECO_ATTEMPTS_REPOSITORY,
  AECO_REPOSITORY,
  type IAecoAttemptsRepository,
  type IAecoRepository,
} from '@shared/domain/repositories'
// import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
// import { formatDate, currentDateTZ } from '@shared/utils/functions'
import type { IAecoPayload } from '@aecos/domain/Types'
import type { IAecoAttempts } from '@common/domain/entities'
import type { IAccessControlAecoService } from '@aecos/domain/services/iot-services/IAccessControlAecoService'

@Injectable()
export class AccessControlAecoService implements IAccessControlAecoService {
  logger = new Logger(AccessControlAecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(AECO_ATTEMPTS_REPOSITORY)
    private readonly aecoAttemptsRepository: IAecoAttemptsRepository,
    // @Inject(AECO_REQUEST_HISTORY_REPOSITORY)
    // private readonly aecoRequestHistoryRepository: IAecoRequestHistoryRepository,
  ) {}

  async run(payload: IAecoPayload): Promise<{
    success: boolean
    message: string
  }> {
    // const { serialNumber, ipAddress, requestData, geolocation } = payload
    const { serialNumber } = payload
    const aeco = await this.aecoRepository.findBy({
      serialNumber,
    })

    if (!aeco) {
      // await this.logAttempt({
      //   serialNumber,
      //   ipAddress,
      //   reason: AecoAttemptsEnum.UNREGISTERED,
      //   requestData,
      //   errorMessage: 'AECO not found in database',
      //   geolocation,
      // })
      this.logger.warn('AECO not found')
      return { success: false, message: 'AECO no encontrado' }
    }

    if (aeco.status !== AecoStatusEnum.ENABLED) {
      // await this.logAttempt({
      //   serialNumber,
      //   ipAddress,
      //   reason: AecoAttemptsEnum.DISABLED,
      //   requestData,
      //   errorMessage: `AECO status: ${aeco.status}`,
      //   geolocation,
      // })
      this.logger.warn(`AECO disabled for SN: ${serialNumber}`)
      return { success: false, message: 'AECO deshabilitado' }
    }

    // try {
    //   const currentDate = formatDate(currentDateTZ())
    //   await this.aecoRepository.updateById(aeco.id, {
    //     lastConnection: currentDate,
    //   })
    //   await this.aecoRequestHistoryRepository.create({
    //     aecoId: aeco.id,
    //     endpoint: requestData.url,
    //     method: requestData.method,
    //     ipAddress,
    //     queryParams: requestData.query,
    //     requestBody: requestData.body,
    //     geolocation,
    //   })
    // } catch (error) {
    //   this.logger.error('Failed to save request history', error.stack)
    // }

    return { success: true, message: 'Request procesada correctamente' }
  }

  private async logAttempt(data: Partial<IAecoAttempts>) {
    try {
      await this.aecoAttemptsRepository.create(data)
    } catch (error) {
      this.logger.error('Failed to save attempt log', error.stack)
    }
  }
}
