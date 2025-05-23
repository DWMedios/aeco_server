import type { IBase } from './IBase'
import type { IAeco } from './IAeco'
import type { IAecoCoords } from '../Types'

export interface IAecoRequestHistory extends IBase {
  readonly endpoint: string // Ej: "/api/v1/sensor-data"
  readonly method: string // GET, POST, etc.
  readonly ipAddress?: string
  readonly queryParams?: Record<string, any>
  readonly requestBody?: Record<string, any>
  readonly geolocation?: IAecoCoords
  readonly aecoId: number
  aeco?: IAeco
}
