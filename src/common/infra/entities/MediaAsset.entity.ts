import { Column, Entity, OneToOne } from 'typeorm'
import { Base } from './Base'
import { Company } from './Company.entity'
import { Campaign } from './Campaign.entity'
import { Contractor } from './Contractor.entity'
import type { IMediaAsset } from '@common/domain/entities'

@Entity({ name: 'media_assets' })
export class MediaAsset extends Base implements IMediaAsset {
  @Column({ type: 'varchar', length: 200 })
  fileKey: string

  @Column({ type: 'varchar', length: 200 })
  originalName: string

  @Column({ type: 'varchar', length: 100 })
  mimeType: string

  @Column({ type: 'int', default: 0 })
  fileSize: number

  @Column({ type: 'varchar', length: 100 })
  assetType: string

  @OneToOne(() => Campaign, (campaign) => campaign.mediaAsset)
  campaignMedia?: Campaign

  @OneToOne(() => Contractor, (contractor) => contractor.mediaAsset)
  contractorLogo?: Contractor

  @OneToOne(() => Company, (contractor) => contractor.mediaAsset)
  companyLogo?: Company
}
