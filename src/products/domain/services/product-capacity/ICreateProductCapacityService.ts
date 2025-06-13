import type { IProductCapacity } from '@common/domain/entities'
import type { CreateProductCapacityDto } from '@products/domain/dto/CreateProductCapacity.dto'

export const CREATE_PRODUCT_CAPACITY_SERVICE = Symbol(
  'ICreateProductCapacityService',
)

export interface ICreateProductCapacityService {
  run(request: CreateProductCapacityDto): Promise<IProductCapacity>
}
