import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import type { IDeleteProductCapacityService } from '@products/domain/services/product-capacity/IDeleteProductCapacityService'

@Injectable()
export class DeleteProductCapacityService
  implements IDeleteProductCapacityService
{
  logger = new Logger(DeleteProductCapacityService.name)

  constructor(
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(id: number): Promise<{ success: boolean }> {
    const productCapacity = await this.productCapacityRepository.findById(id)

    if (!productCapacity) throw new NotFoundException('La capacidad no existe')

    const isDeleted = await this.productCapacityRepository.softDelete(id)

    return { success: isDeleted }
  }
}
