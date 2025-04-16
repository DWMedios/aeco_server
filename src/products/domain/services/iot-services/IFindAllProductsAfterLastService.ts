import type { IProduct } from '@common/domain/entities'

export const FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE = Symbol(
  'IFindAllProductsAfterLastService',
)

export interface IFindAllProductsAfterLastService {
  run(lastId: number): Promise<IProduct[]>
}
