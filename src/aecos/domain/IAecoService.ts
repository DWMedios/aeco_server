import type { IAeco } from '@common/domain/entities'

export const AECO_SERVICE = Symbol('IAecoService')

export interface IAecoService {
  getInitialSetup(serialNumber: string): Promise<IAeco | null>
}
