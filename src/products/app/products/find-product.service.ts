import { IProduct } from '@common/domain/entities'
import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '@shared/domain/repositories'
import type { IFindProductService } from '@products/domain/services/products/IFindProductService'

@Injectable()
export class FindProductService implements IFindProductService {
  logger = new Logger(FindProductService.name)

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async run(id: number, withCapacity?: boolean): Promise<IProduct> {
    const product = await this.productRepository.findById(id, withCapacity)

    if (!product) throw new NotFoundException('El producto no existe')

    return product
  }
}
