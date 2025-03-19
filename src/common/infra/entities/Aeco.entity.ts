import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Base } from './Base'
import { Page } from './Page.entity'
import { Company } from './Company.entity'
import { Ticket } from './Ticket.entity'
import { RewardCategory } from './RewardCategory.entity'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import type { IAeco } from '@common/domain/entities/IAeco'
import type { IAecoCoords } from '@common/domain/Types'

@Entity({ name: 'aecos' })
export class Aeco extends Base implements IAeco {
  @Column({ length: 100 })
  folio: string

  @Column({ length: 100 })
  name: string

  @Column('enum', {
    enum: AecoStatusEnum,
    default: AecoStatusEnum.DISABLED,
    nullable: false,
  })
  status: AecoStatusEnum

  @Column({ type: 'boolean', default: false })
  isOnline: boolean

  @Column({ type: 'boolean', default: true })
  initialSetup: boolean

  @Column({ type: 'boolean', default: false })
  needsUpdate: boolean

  @Column({ type: 'text', unique: true })
  serialNumber: string

  @Column({ type: 'jsonb', nullable: true })
  currentCoords?: IAecoCoords

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @ManyToOne(() => Company, (company) => company.aecos)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company?: Company

  @OneToMany(() => Ticket, (ticket) => ticket.aeco)
  tickets?: Ticket[]

  @OneToMany(() => Page, (page) => page.aeco)
  pages?: Page[]

  @OneToMany(() => RewardCategory, (category) => category.aeco)
  rewardCategories?: RewardCategory[]
}
