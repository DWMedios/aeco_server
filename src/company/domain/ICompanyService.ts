import type { ICompany } from '@common/domain/entities'
import type { CreateCompanyDto } from './dto/CompanyDto'
import { UpdateCompanyDto } from './dto/UpdateCompanyDto'

export const COMPANY_SERVICE = Symbol('ICompanyService')

export interface ICompanyService {
  find(id: number): Promise<Partial<ICompany>>
  create(createCompany: CreateCompanyDto): Promise<Partial<ICompany>>
  update(
    createCompany: UpdateCompanyDto,
    id: number,
  ): Promise<Partial<ICompany>>
  delete(id: number): Promise<Partial<any>>
}
