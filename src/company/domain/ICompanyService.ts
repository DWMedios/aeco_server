import type { ICompany } from '@common/domain/entities'
import type { CreateCompanyDto } from './dto/CompanyDto'
import { UpdateCompanyDto } from './dto/UpdateCompanyDto'

export const COMPANY_SERVICE = Symbol('ICompanyService')

export interface ICompanyService {
  find(id: number): Promise<Partial<ICompany>>
  create(company: CreateCompanyDto): Promise<Partial<ICompany>>
  createWithSettings(company: any): Promise<ICompany>
  update(company: UpdateCompanyDto, id: number): Promise<Partial<ICompany>>
  updateWithSettings(
    company: UpdateCompanyDto,
    id: number,
  ): Promise<Partial<ICompany>>
  delete(id: number): Promise<Partial<any>>
  settings(companyId: number): Promise<any>
}
