import type { ICampaign } from '@common/domain/entities'
import type { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_CAMPAIGN_SERVICE = Symbol('IFindAllCampaignService')

export interface IFindAllCampaignService {
  run(
    filters: CampaignFiltersDto,
  ): Promise<PageMetaDto<ICampaign & { mediaUrl?: string }>>
}
