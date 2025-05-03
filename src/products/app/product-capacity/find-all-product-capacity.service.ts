import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IProductCapacity } from '@common/domain/entities'
import type { ProductCapacityFiltersDto } from '@products/domain/dto/Filters.dto'
import type { IFindAllProductCapacityService } from '@products/domain/services/product-capacity/IFindAllProductCapacityService'

@Injectable()
export class FindAllProductCapacityService
  implements IFindAllProductCapacityService
{
  logger = new Logger(FindAllProductCapacityService.name)

  constructor(
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(
    filters: ProductCapacityFiltersDto,
  ): Promise<PageMetaDto<IProductCapacity>> {
    try {
      const [entities, total] =
        await this.productCapacityRepository.findAll(filters)

      return new PageMetaDto<IProductCapacity>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'No se pudo obtener las capacidades de producto',
      )
    }
  }
}
