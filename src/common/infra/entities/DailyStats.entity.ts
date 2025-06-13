import { Column, Entity, ManyToOne } from 'typeorm'
import { Base } from './Base'
import { Aeco } from './Aeco.entity'
import { Company } from './Company.entity'
import type { IDailyStats } from '@common/domain/entities'

@Entity({ name: 'daily_stats' })
export class DailyStats extends Base implements IDailyStats {
  @Column({ type: 'int', default: 0 })
  totalTickets: number

  @Column({ type: 'int', default: 0 })
  totalBottles: number

  @Column({ type: 'int', default: 0 })
  totalCans: number

  @Column({ type: 'int', nullable: true })
  companyId?: number

  @Column({ type: 'int', nullable: true })
  aecoId?: number

  @ManyToOne(() => Company, (company) => company.dailyStats)
  company?: Company

  @ManyToOne(() => Aeco, (aeco) => aeco.dailyStats)
  aeco?: Aeco
}
