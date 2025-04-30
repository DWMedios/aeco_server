import type { EntityManager } from 'typeorm'
import type { IContractor } from '@common/domain/entities'
import type { ContractorFiltersDto } from '@advertisings/domain/dto/Filters.dto'

export const CONTRACTOR_REPOSITORY = Symbol('IContractorRepository')

export interface IContractorRepository {
  findById(id: number, manager?: EntityManager): Promise<IContractor | null>
  findAll(
    filters: ContractorFiltersDto,
    manager?: EntityManager,
  ): Promise<[IContractor[], number]>
  findByIdAndCompany(
    id: number,
    companyId: number,
    manager?: EntityManager,
  ): Promise<IContractor | null>
  create(
    contractor: Partial<IContractor>,
    manager?: EntityManager,
  ): Promise<IContractor>
  updatePartial(
    exists: IContractor,
    contractor: Partial<IContractor>,
    manager?: EntityManager,
  ): Promise<IContractor>
  updateById(
    id: number,
    contractor: Partial<IContractor>,
    manager?: EntityManager,
  ): Promise<IContractor>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  softDeleteByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
