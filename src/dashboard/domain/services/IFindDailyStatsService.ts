import type { IDailyStats } from '@common/domain/entities'
import type { DailyStatsFiltersDto } from '../dto/DasboardFilters.dto'

export const FIND_DAILY_STATS_SERVICE = Symbol('IFindDailyStatsService')

export interface IFindDailyStatsService {
  run(filters: DailyStatsFiltersDto): Promise<IDailyStats>
}
