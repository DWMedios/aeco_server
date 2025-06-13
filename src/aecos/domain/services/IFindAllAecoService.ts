import type { IAeco } from '@common/domain/entities'
import type { AecoFiltersDto } from '@aecos/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_AECO_SERVICE = Symbol('IFindAllAecoService')

export interface IFindAllAecoService {
  run(filters: AecoFiltersDto): Promise<PageMetaDto<IAeco>>
}
