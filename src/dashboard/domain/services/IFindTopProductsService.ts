import type { ITopProductResult } from '@common/domain/entities'
import type { TopStatsFiltersDto } from '../dto/DasboardFilters.dto'

export const FIND_TOP_PRODUCTS_SERVICE = Symbol('IFindTopProductsService')

export interface IFindTopProductsService {
  run(filters: TopStatsFiltersDto): Promise<ITopProductResult[]>
}
