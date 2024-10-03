import type { ICompany } from '../../common/domain/entities/ICompany'
import type { CreateCompanyDto } from './dto/CompanyDto'

export const COMPANY_SERVICE = Symbol('ICompanyService')

export interface ICompanyService {
  create(createCompany: CreateCompanyDto): Promise<Partial<ICompany>>
}
