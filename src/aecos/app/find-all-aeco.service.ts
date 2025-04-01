import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  AECO_REPOSITORY,
  type IAecoRepository,
} from '@shared/domain/repositories'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IAeco } from '@common/domain/entities'
import type { AecoFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IFindAllAecoService } from '@aecos/domain/services/IFindAllAecoService'

@Injectable()
export class FindAllAecoService implements IFindAllAecoService {
  logger = new Logger(FindAllAecoService.name)

  constructor(
    @Inject(AECO_REPOSITORY)
    private readonly aecoRepository: IAecoRepository,
  ) {}

  async run(filters: AecoFiltersDto): Promise<PageMetaDto<IAeco>> {
    try {
      const [entities, total] = await this.aecoRepository.findAll(filters)

      return new PageMetaDto<IAeco>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener los aecos')
    }
  }
}
