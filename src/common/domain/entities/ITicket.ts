import type { IBase } from './IBase'
import type { IAeco } from './IAeco'
import type { ITicketItem } from './ITicketItem'

export interface ITicket extends IBase {
  readonly folio: string
  readonly method: string
  summary: Record<string, any>
  readonly totalCans: number
  readonly totalBottles: number
  aecoId?: number
  aeco?: IAeco
  items: ITicketItem[]
}
