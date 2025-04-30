import type { ICompany } from '@common/domain/entities'

export const FIND_COMPANY_SERVICE = Symbol('IFindCompanyService')

export interface IFindCompanyService {
  run(id: number): Promise<ICompany & { logoUrl?: string }>
}
