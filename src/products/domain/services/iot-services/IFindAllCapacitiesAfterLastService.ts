import type { IProductCapacity } from '@common/domain/entities'

export const FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE = Symbol(
  'IFindAllCapacitiesAfterLastService',
)

export interface IFindAllCapacitiesAfterLastService {
  run(lastId: number): Promise<IProductCapacity[]>
}
