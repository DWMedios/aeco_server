import type { IAeco } from '@common/domain/entities'
import type { FinishSetupDto } from '../dto/FinishSetupDto'

export const AECO_SERVICE = Symbol('IAecoService')

export interface IAecoService {
  getInitialSetup(serialNumber: string): Promise<IAeco>
  finishSetup(data: FinishSetupDto): Promise<IAeco>
}
