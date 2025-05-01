import type { IAdvertising } from '@common/domain/entities'
import type { FilterAdvertisingDto } from '@advertisings/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_ADVERTISING_SERVICE = Symbol('IFindAllAdvertisingService')

export interface IFindAllAdvertisingService {
  run(filters: FilterAdvertisingDto): Promise<PageMetaDto<IAdvertising>>
}
