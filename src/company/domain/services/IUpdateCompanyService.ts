import type { ICompany } from '@common/domain/entities'
import type { UpdateCompanyDto } from '../dto/UpdateCompany.dto'

export const UPDATE_COMPANY_SERVICE = Symbol('IUpdateCompanyService')

export interface IUpdateCompanyService {
  run(companyId: number, request: UpdateCompanyDto): Promise<ICompany>
}
