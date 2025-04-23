import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { Base } from './Base'
import { Campaign } from './Campaign.entity'
import { MediaAsset } from './MediaAsset.entity'
import { Advertising } from './Advertising.entity'
import { Company } from './Company.entity'
import type { IContractor } from '@common/domain/entities'

@Entity({ name: 'contractors' })
export class Contractor extends Base implements IContractor {
  @Column({ type: 'varchar', length: 200 })
  name: string

  @Column({ type: 'varchar', length: 100 })
  email: string

  @Column({ type: 'varchar', length: 20 })
  phone: string

  @Column({ type: 'int', nullable: true })
  logoId?: string

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @OneToMany(() => Company, (company) => company.contractors)
  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  company?: Company

  @OneToMany(() => Campaign, (campaign) => campaign.contractor)
  campaigns?: Campaign[]

  @OneToOne(() => MediaAsset, (mediaAsset) => mediaAsset.contractorLogo)
  @JoinColumn({ name: 'logoId', referencedColumnName: 'id' })
  mediaAsset?: MediaAsset

  @ManyToMany(() => Advertising, (advertising) => advertising.contractors)
  advertisings?: Advertising[]
}
