import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '@shared/domain/repositories'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { IProduct } from '@common/domain/entities'
import type { ProductFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IFindAllProductsService } from '@products/domain/services/products/IFindAllProductService'

@Injectable()
export class FindAllProductsService implements IFindAllProductsService {
  logger = new Logger(FindAllProductsService.name)

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async run(filters: ProductFiltersDto): Promise<PageMetaDto<IProduct>> {
    try {
      const [entities, total] = await this.productRepository.findAll(filters)

      return new PageMetaDto<IProduct>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener los productos')
    }
  }
}
