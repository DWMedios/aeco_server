export const DELETE_CONTRACTOR_SERVICE = Symbol('IDeleteContractorService')

export interface IDeleteContractorService {
  run(id: number): Promise<{ success: boolean }>
}
