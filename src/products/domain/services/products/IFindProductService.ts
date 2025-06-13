import { IProduct } from '@common/domain/entities'

export const FIND_PRODUCT_SERVICE = Symbol('IFindProductService')

export type IFindProductService = {
  run(id: number, withCapacity?: boolean): Promise<IProduct>
}
