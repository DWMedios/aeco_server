import type { IBase } from './IBase'
import type { PackingType } from '../Types'
import type { ITicket } from './ITicket'
import type { IProduct } from './IProduct'

export interface ITicketItem extends IBase {
  readonly quantity: number
  readonly packagingType: PackingType
  readonly ticketId?: number
  readonly productId?: number
  ticket?: ITicket
  product?: IProduct
}
