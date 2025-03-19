import type { ICompany } from '@common/domain/entities'
import type { CompanyFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_COMPANY_SERVICE = Symbol('IFindAllCompanyService')

export interface IFindAllCompanyService {
  run(filters: CompanyFiltersDto): Promise<PageMetaDto<ICompany>>
}
