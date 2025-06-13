import type { IProductCapacity } from '@common/domain/entities'

export const FIND_PRODUCT_CAPACITY_SERVICE = Symbol(
  'IFindProductCapacityService',
)

export type IFindProductCapacityService = {
  run(id: number, withProducts?: boolean): Promise<IProductCapacity>
}
