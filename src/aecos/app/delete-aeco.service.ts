import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import type { IDeleteAecoService } from '@aecos/domain/services/IDeleteAecoService'

@Injectable()
export class DeleteAecoService implements IDeleteAecoService {
  logger = new Logger(DeleteAecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const aeco = await this.aecoRepository.findBy({ id })

    if (!aeco) throw new NotFoundException('El Aeco no existe')

    const isDeleted = await this.aecoRepository.softDelete(id)

    return { success: isDeleted }
  }
}
