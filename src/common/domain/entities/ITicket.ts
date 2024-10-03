import type { IBase } from './IBase'
import type { IAeco } from './IAeco'

export interface ITicket extends IBase {
  folio: string
  method: string
  summary: Record<string, any>
  totalCans: number
  totalBottles: number
  aecoId?: number | null
  aeco?: IAeco
}
