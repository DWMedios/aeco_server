import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm'
import { Base } from './Base'
import { MediaAsset } from './MediaAsset.entity'
import { Aeco } from './Aeco.entity'
import { Contractor } from './Contractor.entity'
import { Advertising } from './Advertising.entity'
import type { ICampaign } from '@common/domain/entities'

@Entity({ name: 'campaigns' })
export class Campaign extends Base implements ICampaign {
  @Column({ type: 'varchar', length: 200 })
  contractName: string

  @Column({ type: 'varchar', length: 200 })
  description: string

  @Column({ type: 'timestamptz' })
  startDate: Date

  @Column({ type: 'timestamptz' })
  endDate: Date

  @Column({ default: false })
  isEnabled: boolean

  @Column({ type: 'int', nullable: true })
  mediaId?: number

  @Column({ type: 'int', nullable: true })
  contractorId?: number

  @OneToOne(() => MediaAsset, (mediaAsset) => mediaAsset.campaignMedia)
  @JoinColumn({ name: 'mediaId', referencedColumnName: 'id' })
  mediaAsset?: MediaAsset

  @ManyToOne(() => Contractor, (contractor) => contractor.campaigns)
  @JoinColumn({ name: 'contractorId', referencedColumnName: 'id' })
  contractor?: Contractor

  @ManyToMany(() => Aeco, (aeco) => aeco.campaigns)
  @JoinTable({
    name: 'campaigns_aecos',
    joinColumn: {
      name: 'campaignId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'aecoId',
      referencedColumnName: 'id',
    },
  })
  aecos?: Aeco[]

  @ManyToMany(() => Advertising, (advertising) => advertising.campaigns)
  advertisings?: Advertising[]
}
