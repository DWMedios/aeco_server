import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm'
import { Base } from './Base'
import { Company } from './Company.entity'
import { Contractor } from './Contractor.entity'
import { Campaign } from './Campaign.entity'
import type { IAdvertising } from '@common/domain/entities'

@Entity({ name: 'advertisings' })
export class Advertising extends Base implements IAdvertising {
  @Column({ default: true })
  isEnabled: boolean

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @ManyToOne(() => Company, (company) => company.advertisings)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company?: Company

  @ManyToMany(() => Contractor, (contractor) => contractor.advertisings)
  @JoinTable({
    name: 'advertisings_contractors',
    joinColumn: {
      name: 'advertisingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'contractorId',
      referencedColumnName: 'id',
    },
  })
  contractors?: Contractor[]

  @ManyToMany(() => Campaign, (campaign) => campaign.advertisings)
  @JoinTable({
    name: 'advertisings_campaigns',
    joinColumn: {
      name: 'advertisingId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'campaignId',
      referencedColumnName: 'id',
    },
  })
  campaigns?: Campaign[]
}
