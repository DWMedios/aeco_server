import type { ICampaign } from '@common/domain/entities'
import type { UpdateCampaignDto } from '../../dto/campaigns/UpdateCampaign.dto'

export const UPDATE_CAMPAIGN_SERVICE = Symbol('IUpdateCampaignService')

export interface IUpdateCampaignService {
  run(id: number, data: UpdateCampaignDto): Promise<ICampaign>
}
