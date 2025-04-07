import type { IProductStats } from '@common/domain/entities'
import type { PackgingStatsFiltersDto } from '../dto/DasboardFilters.dto'

export const FIND_TOP_PACKAGINGS_SERVICE = Symbol('IFindTopPackagingsService')

export interface IFindTopPackagingsService {
  run(filters: PackgingStatsFiltersDto): Promise<IProductStats[]>
}
