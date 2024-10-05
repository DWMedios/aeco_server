import type { ICompany } from '@domain-entities'
import type { CreateCompanyDto } from './dto/CompanyDto'

export const COMPANY_SERVICE = Symbol('ICompanyService')

export interface ICompanyService {
  create(createCompany: CreateCompanyDto): Promise<Partial<ICompany>>
}
