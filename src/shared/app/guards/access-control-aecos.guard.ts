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
  type IAecoAttemptsRepository,
} from '@shared/domain/repositories'
import { decryptStr } from '@shared/utils/crypto.utils'
import { getCoordsFromIp } from '@shared/utils/functions'
import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import type { IAecoPayload, IAecoRequestData } from '@aecos/domain/Types'
import type { IAecoAttempts } from '@common/domain/entities'

@Injectable()
export class AccessControlAecosGuard implements CanActivate {
  logger = new Logger(AccessControlAecosGuard.name)

  constructor(
    @Inject(AECO_ATTEMPTS_REPOSITORY)
    private readonly aecoAttemptsRepository: IAecoAttemptsRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const apiKey = request.headers['x-api-key'] as string
    const ipAddress = request.ip // Obtener IP del request
    const geolocation = getCoordsFromIp(ipAddress)
    const requestData: IAecoRequestData = {
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

    const aecoPayload: IAecoPayload = {
      serialNumber: decryptedApiKey,
      ipAddress,
      geolocation,
      requestData,
    }
    request['aecoPayload'] = aecoPayload
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
