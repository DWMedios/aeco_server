import type { IProduct } from '@common/domain/entities'
import type { UpdateProductDto } from '@products/domain/dto/UpdateProduct.dto copy'

export const UPDATE_PRODUCT_SERVICE = Symbol('IUpdateProductService')

export interface IUpdateProductService {
  run(id: number, request: UpdateProductDto): Promise<IProduct>
}
