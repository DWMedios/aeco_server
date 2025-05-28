import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
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

    await this.aecoRepository.updateById(id, {
      folio: `${aeco.folio}-deleted-${Number(new Date())}`,
      serialNumber: `${aeco.serialNumber}-deleted-${Number(new Date())}`,
      isOnline: false,
      initialSetup: false,
      needsUpdate: false,
      status: AecoStatusEnum.DEACTIVATED,
    })

    const isDeleted = await this.aecoRepository.softDelete(id)

    return { success: isDeleted }
  }
}
