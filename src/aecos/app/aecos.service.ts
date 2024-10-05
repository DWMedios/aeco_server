import { Inject, Injectable } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import { IAecoService } from '../domain/IAecoService'

@Injectable()
export class AecosService implements IAecoService {
  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}

  async getInitialSetup(serialNumber: string) {
    const aeco = await this.aecoRepository.initialSetup(serialNumber)

    if (!aeco) throw new Error('Aeco not found')

    return aeco
  }
}
