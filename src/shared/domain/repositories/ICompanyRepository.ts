import type { ICompany } from '@common/domain/entities'
import type { CreateCompanyDto } from '../../../company/domain/dto/CompanyDto'
import { UpdateCompanyDto } from 'src/company/domain/dto/UpdateCompanyDto'

export const COMPANY_REPOSITORY = Symbol('ICompanyRepository')

export interface ICompanyRepository {
  exists(filter: { id?: number; name?: string }): Promise<boolean>
  find(id: number): Promise<ICompany>
  create(createCompany: CreateCompanyDto): Promise<ICompany>
  update(company: UpdateCompanyDto, id: number): Promise<ICompany>
  delete(id: number): Promise<boolean>
}
