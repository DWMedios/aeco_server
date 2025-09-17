import { Column, Entity, Index, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
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
  @Index()
  companyId?: number

  @Column({ type: 'int', nullable: true })
  @Index()
  aecoId?: number

  @ManyToOne(() => Company, (company) => company.packagingStats)
  company?: Company

  @ManyToOne(() => Aeco, (aeco) => aeco.packagingStats)
  aeco?: Aeco
}
