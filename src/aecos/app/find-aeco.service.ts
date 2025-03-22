import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import type { IAeco } from '@common/domain/entities'
import type { IFindAecoService } from '@aecos/domain/services/IFindAecoService'

@Injectable()
export class FindAecoService implements IFindAecoService {
  logger = new Logger(FindAecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}

  async run(id: number): Promise<IAeco> {
    const aeco = await this.aecoRepository.findBy({ id })

    if (!aeco) throw new NotFoundException('El Aeco no existe')

    return aeco
  }
}
