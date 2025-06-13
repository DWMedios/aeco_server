import type { IAeco } from '@common/domain/entities'

export const FIND_AECO_SERVICE = Symbol('IFindAecoService')

export interface IFindAecoService {
  run(id: number): Promise<IAeco>
}
