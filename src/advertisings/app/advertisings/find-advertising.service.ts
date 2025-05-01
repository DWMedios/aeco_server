import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
  ADVERTISING_REPOSITORY,
  type IAdvertisingRepository,
} from '@shared/domain/repositories'
import type { IAdvertising } from '@common/domain/entities'
import type { IFindAdvertisingService } from '@advertisings/domain/services/advertisings/IFindAdvertisingService'

@Injectable()
export class FindAdvertisingService implements IFindAdvertisingService {
  logger = new Logger(FindAdvertisingService.name)

  constructor(
    @Inject(ADVERTISING_REPOSITORY)
    private readonly advertisingRepository: IAdvertisingRepository,
  ) {}

  async run(id: number): Promise<IAdvertising> {
    const advertising = await this.advertisingRepository.findById(id)
    if (!advertising) {
      throw new NotFoundException('El anuncio no existe')
    }

    return advertising
  }
}
