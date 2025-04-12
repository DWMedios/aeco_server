import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import { decryptStr } from '@shared/utils/crypto.utils'
import { DecodedAeco } from '@shared/domain/Types'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'

@Injectable()
export class AecosGuard implements CanActivate {
  logger = new Logger(AecosGuard.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const apiKey = request.headers['x-api-key'] as string

    if (!apiKey) {
      this.logger.warn('API key not found')
      return false
    }

    const decryptedApiKey = decryptStr(apiKey)
    if (!decryptedApiKey) {
      this.logger.warn('API key not valid')
      return false
    }

    const aeco = await this.aecoRepository.findBy({
      serialNumber: decryptedApiKey,
      status: AecoStatusEnum.ENABLED,
    })

    if (!aeco) {
      this.logger.warn('AECO not found')
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

    request['decodedAeco'] = decodedAeco
    return true
  }
}
