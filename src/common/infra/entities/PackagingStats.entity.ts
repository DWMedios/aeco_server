import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Company } from './Company.entity'
import type { PackingType } from '@common/domain/Types'
import type { IPackagingStats } from '@common/domain/entities'

@Entity({ name: 'packaging_stats' })
export class PackagingStats extends Base implements IPackagingStats {
  @Column({ type: 'varchar', length: 20, nullable: false })
  packagingType: PackingType

  @Column({ type: 'int', default: 0 })
  totalCount: number

  @Column({ type: 'int', nullable: true })
  coompanyId?: number

  @ManyToOne(() => Company, (company) => company.packagingStats)
  company?: Company
}
