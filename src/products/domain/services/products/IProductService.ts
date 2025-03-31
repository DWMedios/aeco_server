import type { IProduct } from '@common/domain/entities'
import type { ProductFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_PRODUCTS_SERVICE = Symbol('IFindAllProductsService')

export interface IFindAllProductsService {
  run(filters: ProductFiltersDto): Promise<PageMetaDto<IProduct>>
}
