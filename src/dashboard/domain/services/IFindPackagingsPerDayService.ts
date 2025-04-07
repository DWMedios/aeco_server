import type { IDailyStats } from '@common/domain/entities'
import type { PackingsPerDayDto } from '../dto/DasboardFilters.dto'

export const FIND_PACKAGINGS_PER_DAY_SERVICE = Symbol(
  'IFindPackagingsPerDayService',
)

export interface IFindPackagingsPerDayService {
  run(filters: PackingsPerDayDto): Promise<IDailyStats[]>
}
