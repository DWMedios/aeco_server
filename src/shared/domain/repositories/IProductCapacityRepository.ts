import type { EntityManager } from 'typeorm'
import type { IProductCapacity } from '@common/domain/entities'
import type { ProductCapacityFiltersDto } from '../dto/Filters.dto'

export const PRODUCT_CAPACITY_REPOSITORY = Symbol('IProductCapacityRepository')

export interface IProductCapacityRepository {
  findById(
    id: number,
    withProducts?: boolean,
    manager?: EntityManager,
  ): Promise<IProductCapacity | null>
  findAll(
    filters: ProductCapacityFiltersDto,
    manager?: EntityManager,
  ): Promise<[IProductCapacity[], number]>
  create(
    productCapacity: Partial<IProductCapacity>,
    manager?: EntityManager,
  ): Promise<IProductCapacity>
  update(
    id: number,
    productCapacity: Partial<IProductCapacity>,
    manager?: EntityManager,
  ): Promise<IProductCapacity>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
