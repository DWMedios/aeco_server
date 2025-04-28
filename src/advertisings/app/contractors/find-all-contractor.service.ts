import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  CONTRACTOR_REPOSITORY,
  type IContractorRepository,
} from '@shared/domain/repositories'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IContractor } from '@common/domain/entities'
import type { ContractorFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IFindAllContractorService } from '@advertisings/domain/services/contractors/IFindAllContractorService'

@Injectable()
export class FindAllContractorService implements IFindAllContractorService {
  logger = new Logger(FindAllContractorService.name)

  constructor(
    @Inject(CONTRACTOR_REPOSITORY)
    private readonly contractorRepository: IContractorRepository,
  ) {}

  async run(filters: ContractorFiltersDto): Promise<PageMetaDto<IContractor>> {
    try {
      const [entities, total] = await this.contractorRepository.findAll(filters)

      return new PageMetaDto<IContractor>({
        total,
        pageOptionsDto: filters,
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'Error al recuperar los contratistas',
      )
    }
  }
}
