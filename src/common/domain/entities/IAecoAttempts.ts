import type { IBase } from './IBase'
import type { IAecoCoords } from '../Types'
import type { AecoAttemptsEnum } from '../enums/AecoAttempts.enum'

export interface IAecoAttempts extends IBase {
  readonly serialNumber: string
  readonly ipAddress?: string
  readonly reason: AecoAttemptsEnum
  readonly requestData?: Record<string, any>
  readonly errorMessage?: string
  readonly geolocation?: IAecoCoords
}
