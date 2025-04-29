import type { IContractor } from '@common/domain/entities'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { ContractorFiltersDto } from '@shared/domain/dto/Filters.dto'

export const FIND_ALL_CONTRACTOR_SERVICE = Symbol('IFindAllContractorService')

export interface IFindAllContractorService {
  run(
    filters: ContractorFiltersDto,
  ): Promise<PageMetaDto<IContractor & { logoUrl?: string }>>
}
