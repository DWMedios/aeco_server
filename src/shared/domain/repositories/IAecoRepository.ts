import type { EntityManager } from 'typeorm'
import type { IAeco } from '@common/domain/entities'
import type { IAecoFilterOptions } from '@aecos/domain/Types'
import type { AecoFiltersDto } from '../dto/Filters.dto'

export const AECO_REPOSITORY = Symbol('IAecoRepository')

export interface IAecoRepository {
  findBy(
    filters: IAecoFilterOptions,
    manager?: EntityManager,
  ): Promise<IAeco | null>
  count(): Promise<number>
  findAll(
    filters: AecoFiltersDto,
    manager?: EntityManager,
  ): Promise<[IAeco[], number]>
  findManyByIds(ids: number[], manager?: EntityManager): Promise<IAeco[]>
  create(company: Partial<IAeco>, manager?: EntityManager): Promise<IAeco>
  update(
    exists: IAeco,
    aeco: Partial<IAeco>,
    manager?: EntityManager,
  ): Promise<IAeco>
  initialSetup(
    serialNumber: string,
    manager?: EntityManager,
  ): Promise<IAeco | null>
  getUpdates(
    serialNumber: string,
    manager?: EntityManager,
  ): Promise<IAeco | null>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
