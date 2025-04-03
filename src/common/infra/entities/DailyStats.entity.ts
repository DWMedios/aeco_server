import { Column, Entity } from 'typeorm'
import { Base } from './Base'
import type { IDailyStats } from '@common/domain/entities'

@Entity({ name: 'daily_stats' })
export class DailyStats extends Base implements IDailyStats {
  @Column({ type: 'int', default: 0 })
  totalTickets: number

  @Column({ type: 'int', default: 0 })
  totalBottles: number

  @Column({ type: 'int', default: 0 })
  totalCans: number
}
