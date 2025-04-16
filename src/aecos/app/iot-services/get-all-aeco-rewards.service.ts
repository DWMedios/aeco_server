import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import type { IAeco } from '@common/domain/entities'
import type { DecodedAeco } from '@shared/domain/Types'
import type { IGetAllAecoRewardsService } from '@aecos/domain/services/iot-services/IGetAllAecoRewardsService'

@Injectable()
export class GetAllAecoRewardsService implements IGetAllAecoRewardsService {
  logger = new Logger(GetAllAecoRewardsService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}

  async run(currentAeco: DecodedAeco): Promise<IAeco> {
    const { aecoId } = currentAeco
    const aeco = await this.aecoRepository.getRewardsByAeco(aecoId)

    if (!aeco) throw new NotFoundException('El Aeco no existe')

    return aeco
  }
}
