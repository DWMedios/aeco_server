import { Injectable, Logger, Inject, NotFoundException } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import type { IAeco } from '@common/domain/entities'
import type { DecodedAeco } from '@shared/domain/Types'
import type { IGetAllAecoAdvertisingsService } from '@aecos/domain/services/iot-services/IGetAllAecoAdvertisingsService'

@Injectable()
export class GetAllAecoAdvertisingsService
  implements IGetAllAecoAdvertisingsService
{
  logger = new Logger(GetAllAecoAdvertisingsService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}
  async run(currentAeco: DecodedAeco): Promise<IAeco> {
    const { aecoId } = currentAeco
    const aeco = await this.aecoRepository.getCampaignsByAeco(aecoId)

    if (!aeco) throw new NotFoundException('El Aeco no existe')

    return aeco
  }
}
