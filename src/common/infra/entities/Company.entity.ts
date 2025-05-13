import { Entity, Column, OneToOne, OneToMany, JoinColumn, Index } from 'typeorm'
import { Base } from './Base'
import { User } from './User.entity'
import { Aeco } from './Aeco.entity'
import { Reward } from './Reward.entity'
import { DailyStats } from './DailyStats.entity'
import { ProductStats } from './ProductStats.entity'
import { PackagingStats } from './PackagingStats.entity'
import { Advertising } from './Advertising.entity'
import { Contractor } from './Contractor.entity'
import { MediaAsset } from './MediaAsset.entity'
import { Campaign } from './Campaign.entity'
import type { ICompany, ILegalRepresentative } from '@common/domain/entities'

@Entity({ name: 'companies' })
@Index('companies_rfc_unique', ['rfc'], {
  unique: true,
  where: '"deletedAt" IS NULL',
})
export class Company extends Base implements ICompany {
  @Column({ length: 100 })
  name: string

  @Column({ length: 13 })
  rfc: string

  @Column({ nullable: true, length: 100 })
  state?: string

  @Column({ nullable: true, length: 100 })
  city?: string

  @Column({ type: 'text', nullable: true })
  address?: string

  @Column({ nullable: true, length: 10 })
  postalCode?: string

  @Column({ nullable: true, length: 20 })
  phone?: string

  @Column({ type: 'jsonb', nullable: true })
  legalRepresentative?: ILegalRepresentative

  @Column({ type: 'boolean', default: true })
  status: boolean

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>

  @Column({ type: 'int', nullable: true })
  logoId?: number

  @OneToMany(() => User, (user) => user.company)
  users?: User[]

  @OneToOne(() => MediaAsset, (mediaAsset) => mediaAsset.companyLogo)
  @JoinColumn({ name: 'logoId', referencedColumnName: 'id' })
  mediaAsset?: MediaAsset

  @OneToMany(() => Reward, (reward) => reward.company)
  rewards?: Reward[]

  @OneToMany(() => Aeco, (aeco) => aeco.company)
  aecos?: Aeco[]

  @OneToMany(() => DailyStats, (dailyStats) => dailyStats.company)
  dailyStats?: DailyStats[]

  @OneToMany(() => ProductStats, (productStats) => productStats.company)
  productStats?: ProductStats[]

  @OneToMany(() => PackagingStats, (packagingStats) => packagingStats.company)
  packagingStats?: PackagingStats[]

  @OneToMany(() => Advertising, (advertising) => advertising.company)
  advertisings?: Advertising[]

  @OneToMany(() => Contractor, (contractor) => contractor.company)
  contractors?: Contractor[]

  @OneToMany(() => Campaign, (campaign) => campaign.company)
  campaigns?: Campaign[]
}
