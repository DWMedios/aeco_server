export const DELETE_COMPANY_SERVICE = Symbol('IDeleteCompanyService')

export interface IDeleteCompanyService {
  run(companyId: number): Promise<{ success: boolean }>
}
