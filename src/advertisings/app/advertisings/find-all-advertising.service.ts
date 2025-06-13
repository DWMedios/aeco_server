import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  ADVERTISING_REPOSITORY,
  type IAdvertisingRepository,
} from '@shared/domain/repositories'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IAdvertising } from '@common/domain/entities'
import type { FilterAdvertisingDto } from '@advertisings/domain/dto/Filters.dto'
import type { IFindAllAdvertisingService } from '@advertisings/domain/services/advertisings/IFindAllAdvertisingService'

@Injectable()
export class FindAllAdvertisingService implements IFindAllAdvertisingService {
  logger = new Logger(FindAllAdvertisingService.name)

  constructor(
    @Inject(ADVERTISING_REPOSITORY)
    private readonly advertisingRepository: IAdvertisingRepository,
  ) {}

  async run(filters: FilterAdvertisingDto): Promise<PageMetaDto<IAdvertising>> {
    try {
      const [entities, total] =
        await this.advertisingRepository.findAll(filters)

      return new PageMetaDto<IAdvertising>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener los anuncios')
    }
  }
}
