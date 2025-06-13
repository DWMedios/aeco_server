import type { IBase } from './IBase'
import type { IProductCapacity } from './IProductCapacity'
import type { IProductStats } from './IProductStats'
import type { ITicketItem } from './ITicketItem'

export interface IProduct extends IBase {
  readonly code: string
  readonly family: string
  readonly name: string
  readonly capacityId: number
  capacity: IProductCapacity
  ticketItems: ITicketItem[]
  stats: IProductStats[]
}
