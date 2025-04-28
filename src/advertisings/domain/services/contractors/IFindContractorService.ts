import type { IContractor } from '@common/domain/entities'

export const FIND_CONTRACTOR_SERVICE = Symbol('IFindContractorService')

export interface IFindContractorService {
  run(id: number): Promise<IContractor>
}
