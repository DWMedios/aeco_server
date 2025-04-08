import type { EntityManager } from 'typeorm'
import type { ICompany } from '@common/domain/entities'
import type { CompanyFiltersDto } from '../dto/Filters.dto'
import type { ICompanyFilterOptions } from '@company/domain/Types'

export const COMPANY_REPOSITORY = Symbol('ICompanyRepository')

export interface ICompanyRepository {
  exists(
    filter: ICompanyFilterOptions,
    manager?: EntityManager,
  ): Promise<boolean>
  findById(id: number, manager?: EntityManager): Promise<ICompany | null>
  findAll(
    filters: CompanyFiltersDto,
    manager?: EntityManager,
  ): Promise<[ICompany[], number]>
  create(company: Partial<ICompany>, manager?: EntityManager): Promise<ICompany>
  update(
    exists: ICompany,
    company: Partial<ICompany>,
    manager?: EntityManager,
  ): Promise<ICompany>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
