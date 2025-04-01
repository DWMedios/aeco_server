import type { IProduct } from '@common/domain/entities'
import type { CreateProductDto } from '@products/domain/dto/CreateProduct.dto'

export const CREATE_PRODUCT_SERVICE = Symbol('ICreateProductService')

export interface ICreateProductService {
  run(request: CreateProductDto): Promise<IProduct>
}
