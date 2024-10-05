import type { IAeco } from '@common/domain/entities'

export const AECO_REPOSITORY = Symbol('IAecoRepository')

export interface IAecoRepository {
  initialSetup(serialNumber: string): Promise<IAeco | null>
}
