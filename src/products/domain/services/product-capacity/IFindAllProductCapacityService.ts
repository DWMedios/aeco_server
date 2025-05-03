import type { IProductCapacity } from '@common/domain/entities'
import type { ProductCapacityFiltersDto } from '@products/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_PRODUCT_CAPACITY_SERVICE = Symbol(
  'IFindAllProductCapacityService',
)

export interface IFindAllProductCapacityService {
  run(
    filters: ProductCapacityFiltersDto,
  ): Promise<PageMetaDto<IProductCapacity>>
}
