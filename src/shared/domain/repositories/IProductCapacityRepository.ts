import type { EntityManager } from 'typeorm'
import type { IProductCapacity } from '@common/domain/entities'
import type { ProductCapacityFiltersDto } from '../dto/Filters.dto'
import type { ProductCapacityFilterByOptions } from '@products/domain/Types'

export const PRODUCT_CAPACITY_REPOSITORY = Symbol('IProductCapacityRepository')

export interface IProductCapacityRepository {
  existsBy(
    filters: ProductCapacityFilterByOptions,
    manager?: EntityManager,
  ): Promise<boolean>
  findById(
    id: number,
    withProducts?: boolean,
    manager?: EntityManager,
  ): Promise<IProductCapacity | null>
  findAll(
    filters: ProductCapacityFiltersDto,
    manager?: EntityManager,
  ): Promise<[IProductCapacity[], number]>
  findAllAfterLast(
    lastId: number,
    limit?: number,
    manager?: EntityManager,
  ): Promise<IProductCapacity[]>
  create(
    productCapacity: Partial<IProductCapacity>,
    manager?: EntityManager,
  ): Promise<IProductCapacity>
  updateById(
    id: number,
    productCapacity: Partial<IProductCapacity>,
    manager?: EntityManager,
  ): Promise<IProductCapacity>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
