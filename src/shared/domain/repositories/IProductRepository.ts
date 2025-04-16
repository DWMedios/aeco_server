import type { EntityManager } from 'typeorm'
import type { IProduct } from '@common/domain/entities'
import type { ProductFiltersDto } from '../dto/Filters.dto'
import type { ProductFilterByOptions } from '@products/domain/Types'

export const PRODUCT_REPOSITORY = Symbol('IProductRepository')

export interface IProductRepository {
  existsBy(
    filters: ProductFilterByOptions,
    manager?: EntityManager,
  ): Promise<boolean>
  findById(
    id: number,
    withCapacity?: boolean,
    manager?: EntityManager,
  ): Promise<IProduct | null>
  findAll(
    filters: ProductFiltersDto,
    manager?: EntityManager,
  ): Promise<[IProduct[], number]>
  findAllAfterLast(
    lastId: number,
    limit?: number,
    manager?: EntityManager,
  ): Promise<IProduct[]>
  findManyByIds(ids: number[], manager?: EntityManager): Promise<IProduct[]>
  create(product: Partial<IProduct>, manager?: EntityManager): Promise<IProduct>
  update(
    id: number,
    product: Partial<IProduct>,
    manager?: EntityManager,
  ): Promise<IProduct>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
