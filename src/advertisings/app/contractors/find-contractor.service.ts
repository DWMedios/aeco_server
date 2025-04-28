import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common'
import {
  CONTRACTOR_REPOSITORY,
  type IContractorRepository,
} from '@shared/domain/repositories'
import type { IContractor } from '@common/domain/entities'
import type { IFindContractorService } from '@advertisings/domain/services/contractors/IFindContractorService'

@Injectable()
export class FindContractorService implements IFindContractorService {
  logger = new Logger(FindContractorService.name)

  constructor(
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
  ) {}

  async run(id: number): Promise<IContractor> {
    const contractor = await this.contractorRepository.findById(id)
    if (!contractor) {
      throw new NotFoundException('El contratista no existe')
    }
    return contractor
  }
}
