import { Column, Entity } from 'typeorm'
import { Base } from './Base'
import type { PackingType } from '@common/domain/Types'
import type { IPackagingStats } from '@common/domain/entities'

@Entity({ name: 'packaging_stats' })
export class PackagingStats extends Base implements IPackagingStats {
  @Column({ type: 'varchar', length: 20, nullable: false })
  packagingType: PackingType

  @Column({ type: 'int', default: 0 })
  totalCount: number
}
