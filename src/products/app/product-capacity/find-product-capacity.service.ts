import { IProductCapacity } from '@common/domain/entities'
import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  PRODUCT_CAPACITY_REPOSITORY,
  type IProductCapacityRepository,
} from '@shared/domain/repositories'
import type { IFindProductCapacityService } from '@products/domain/services/product-capacity/IFindProductCapacityService'

@Injectable()
export class FindProductCapacityService implements IFindProductCapacityService {
  logger = new Logger(FindProductCapacityService.name)

  constructor(
    @Inject(PRODUCT_CAPACITY_REPOSITORY)
    private readonly productCapacityRepository: IProductCapacityRepository,
  ) {}

  async run(id: number, withProducts?: boolean): Promise<IProductCapacity> {
    const productCapacity = await this.productCapacityRepository.findById(
      id,
      withProducts,
    )

    if (!productCapacity) throw new NotFoundException('La capacidad no existe')

    return productCapacity
  }
}
