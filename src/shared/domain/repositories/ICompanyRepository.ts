import type { ICompany } from '@domain-entities'
import type { CreateCompanyDto } from '../../../company/domain/dto/CompanyDto'

export const COMPANY_REPOSITORY = Symbol('ICompanyRepository')

export interface ICompanyRepository {
  exists(filter: { id?: number; name?: string }): Promise<boolean>
  create(createCompany: CreateCompanyDto): Promise<ICompany>
}
