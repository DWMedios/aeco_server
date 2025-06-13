import { Entity, Column, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Ticket } from './Ticket.entity'
import { Product } from './Product.entity'
import type { PackingType } from '@common/domain/Types'
import type { ITicketItem } from '@common/domain/entities'

@Entity({ name: 'ticket_items' })
export class TicketItem extends Base implements ITicketItem {
  @Column({ type: 'int', default: 1 })
  quantity: number

  @Column({ type: 'varchar' })
  packagingType: PackingType

  @Column({ type: 'int', nullable: true })
  ticketId?: number

  @Column({ type: 'int', nullable: true })
  productId?: number

  @ManyToOne(() => Ticket, (ticket) => ticket.items, { onDelete: 'CASCADE' })
  ticket?: Ticket

  @ManyToOne(() => Product, (product) => product.ticketItems)
  product?: Product
}
