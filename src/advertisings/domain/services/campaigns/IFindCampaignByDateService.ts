import type { CountByDay } from '@advertisings/domain/Types'
import type { FilterCampaignByDateDto } from '../../dto/Filters.dto'

export const FIND_CAMPAIGN_BY_DATE_SERVICE = Symbol(
  'IFindCampaignByDateService',
)

export interface IFindCampaignByDateService {
  run(filters: FilterCampaignByDateDto): Promise<CountByDay[]>
}
