import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import {
  AECO_ATTEMPTS_REPOSITORY,
  AECO_REPOSITORY,
  AECO_REQUEST_HISTORY_REPOSITORY,
  type IAecoAttemptsRepository,
  type IAecoRequestHistoryRepository,
  type IAecoRepository,
} from '@shared/domain/repositories'
import {
  currentDateTZ,
  formatDate,
  getCoordsFromIp,
} from '@shared/utils/functions'
import { decryptStr } from '@shared/utils/crypto.utils'
import { DecodedAeco } from '@shared/domain/Types'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import type { IAecoAttempts } from '@common/domain/entities'

@Injectable()
export class AecosGuard implements CanActivate {
  logger = new Logger(AecosGuard.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
    @Inject(AECO_ATTEMPTS_REPOSITORY)
    private readonly aecoAttemptsRepository: IAecoAttemptsRepository,
    @Inject(AECO_REQUEST_HISTORY_REPOSITORY)
    private readonly aecoRequestHistoryRepository: IAecoRequestHistoryRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const apiKey = request.headers['x-api-key'] as string
    const ipAddress = request.ip // Obtener IP del request
    const geolocation = getCoordsFromIp(ipAddress)
    const requestData = {
      method: request.method,
      url: request.url,
      body: request.body,
      query: request.query,
      params: request.params,
      headers: request.headers,
    }

    if (!apiKey) {
      await this.logAttempt({
        serialNumber: 'UNKNOWN',
        ipAddress,
        reason: AecoAttemptsEnum.MISSING_API_KEY,
        requestData,
        errorMessage: 'API key not found',
        geolocation,
      })
      this.logger.warn('API key not found')
      return false
    }

    const decryptedApiKey = decryptStr(apiKey)
    if (!decryptedApiKey) {
      await this.logAttempt({
        serialNumber: 'UNKNOWN',
        ipAddress,
        reason: AecoAttemptsEnum.INVALID_API_KEY_FORMAT,
        requestData,
        errorMessage: 'Failed to decrypt API key',
        geolocation,
      })
      this.logger.warn('API key not valid')
      return false
    }

    const aeco = await this.aecoRepository.findBy({
      serialNumber: decryptedApiKey,
    })

    if (!aeco) {
      await this.logAttempt({
        serialNumber: decryptedApiKey,
        ipAddress,
        reason: AecoAttemptsEnum.UNREGISTERED,
        requestData,
        errorMessage: 'AECO not found in database',
        geolocation,
      })
      this.logger.warn('AECO not found')
      return false
    }

    if (aeco.status !== AecoStatusEnum.ENABLED) {
      await this.logAttempt({
        serialNumber: decryptedApiKey,
        ipAddress,
        reason: AecoAttemptsEnum.DISABLED,
        requestData,
        errorMessage: `AECO status: ${aeco.status}`,
        geolocation,
      })
      this.logger.warn(`AECO disabled for SN: ${decryptedApiKey}`)
      return false
    }

    const decodedAeco: DecodedAeco = {
      aecoId: aeco.id,
      aecoName: aeco.name,
      aecoSerialNumber: aeco.serialNumber,
      company: {
        id: aeco.company?.id,
        name: aeco.company?.name,
      },
    }

    try {
      const currentDate = formatDate(currentDateTZ())
      await this.aecoRepository.updateById(aeco.id, {
        lastConnection: currentDate,
      })
      await this.aecoRequestHistoryRepository.create({
        aecoId: aeco.id,
        endpoint: request.url,
        method: request.method,
        ipAddress,
        queryParams: request.query,
        requestBody: request.body,
        geolocation,
      })
    } catch (error) {
      this.logger.error('Failed to save request history', error.stack)
    }

    request['decodedAeco'] = decodedAeco
    return true
  }

  private async logAttempt(data: Partial<IAecoAttempts>) {
    try {
      await this.aecoAttemptsRepository.create(data)
    } catch (error) {
      this.logger.error('Failed to save attempt log', error.stack)
    }
  }
}
