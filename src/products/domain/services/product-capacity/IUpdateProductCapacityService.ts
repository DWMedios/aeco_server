import type { IProductCapacity } from '@common/domain/entities'
import type { UpdateProductCapacityDto } from '@products/domain/dto/UpdateProductCapacity.dto'

export const UPDATE_PRODUCT_CAPACITY_SERVICE = Symbol(
  'IUpdateProductCapacityService',
)

export interface IUpdateProductCapacityService {
  run(id: number, request: UpdateProductCapacityDto): Promise<IProductCapacity>
}
