import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Address } from './Address.entity'
import { Base } from './Base'
import { Company } from './Company.entity'
import { Page } from './Page.entity'
import { Ticket } from './Ticket.entity'
import { RewardCategory } from './RewardCategory.entity'
import type { IAeco } from '../../domain/entities/IAeco'

export enum AecoStatus {
  ENABLED = 'enabled',
  DISABLED = 'disabled',
}

@Entity({ name: 'aecos' })
export class Aeco extends Base implements IAeco {
  @Column()
  name: string

  @Column('enum', {
    enum: AecoStatus,
    default: AecoStatus.DISABLED,
    nullable: false,
  })
  status: AecoStatus

  @Column({ default: false })
  isOnline: boolean

  @Column({ unique: true })
  serialNumber: string

  @Column({ type: 'jsonb', nullable: true })
  currentCoords: Record<string, any>

  @Column()
  companyId: number

  @Column()
  addressId: number

  @ManyToOne(() => Company, (company) => company.aecos)
  company: Company

  @ManyToOne(() => Address, (address) => address.aecos)
  address: Address

  @OneToMany(() => Ticket, (ticket) => ticket.aeco)
  tickets: Ticket[]

  @OneToMany(() => Page, (page) => page.aeco)
  pages: Page[]

  @OneToMany(() => RewardCategory, (category) => category.aeco)
  rewardCategories: RewardCategory[]
}
