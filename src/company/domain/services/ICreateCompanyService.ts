import type { ICompany } from '@common/domain/entities'
import type { CreateCompanyDto } from '../dto/CreateCompany.dto'

export const CREATE_COMPANY_SERVICE = Symbol('ICreateCompanyService')

export interface ICreateCompanyService {
  run(request: CreateCompanyDto): Promise<ICompany>
}
