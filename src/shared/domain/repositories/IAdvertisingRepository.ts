import type { EntityManager } from 'typeorm'
import type { IAdvertising } from '@common/domain/entities'
import type { FilterAdvertisingDto } from '@advertisings/domain/dto/Filters.dto'

export const ADVERTISING_REPOSITORY = Symbol('IAdvertisingRepository')

export interface IAdvertisingRepository {
  findById(id: number, manager?: EntityManager): Promise<IAdvertising | null>
  findManyByCompanyAndAeco(
    companyId: number,
    aecoId: number,
    manager?: EntityManager,
  ): Promise<IAdvertising[]>
  findAll(
    filters: FilterAdvertisingDto,
    manager?: EntityManager,
  ): Promise<[IAdvertising[], number]>
  create(
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising>
  updatePartial(
    exists: IAdvertising,
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising>
  updateById(
    id: number,
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising>
  updateManyByCompany(
    companyId: number,
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising[]>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  softDeleteManyByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
