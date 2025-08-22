import { Entity, Column, ManyToOne, OneToMany, Index } from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
import { TicketItem } from './TicketItems.entity'
import type { ITicket } from '@common/domain/entities'

@Entity({ name: 'tickets' })
export class Ticket extends Base implements ITicket {
  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  folio: string

  @Column({ type: 'varchar', length: 20, nullable: false })
  method: string

  @Column({ type: 'jsonb', nullable: true })
  summary: Record<string, any>

  @Column({ type: 'int', default: 0 })
  totalCans: number

  @Column({ type: 'int', default: 0 })
  totalBottles: number

  @Column({ type: 'int', nullable: true })
  @Index()
  aecoId?: number

  @ManyToOne(() => Aeco, (aeco) => aeco.tickets)
  aeco?: Aeco

  @OneToMany(() => TicketItem, (item) => item.ticket)
  items: TicketItem[]
}
