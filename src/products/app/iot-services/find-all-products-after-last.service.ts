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
import type { IProduct } from '@common/domain/entities'
import type { IFindAllProductsAfterLastService } from '@products/domain/services/iot-services/IFindAllProductsAfterLastService'

@Injectable()
export class FindAllProductsAfterLastService
  implements IFindAllProductsAfterLastService
{
  logger = new Logger(FindAllProductsAfterLastService.name)

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async run(lastId: number): Promise<IProduct[]> {
    try {
      const entities = await this.productRepository.findAllAfterLast(lastId)

      return entities
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener los productos')
    }
  }
}
