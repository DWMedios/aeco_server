import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  PRODUCT_REPOSITORY,
  type IProductRepository,
} from '@shared/domain/repositories'
import type { IDeleteProductService } from '@products/domain/services/products/IDeleteProductService'

@Injectable()
export class DeleteProductService implements IDeleteProductService {
  logger = new Logger(DeleteProductService.name)

  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const product = await this.productRepository.findById(id)

    if (!product) throw new NotFoundException('El producto no existe')

    const currentDate = Number(new Date())
    await this.productRepository.updateById(id, {
      code: `${product.code}-deleted-${currentDate}`,
      name: `${product.name}-deleted-${currentDate}`,
      family: `${product.family}-deleted-${currentDate}`,
    })
    const isDeleted = await this.productRepository.softDelete(id)

    return { success: isDeleted }
  }
}
