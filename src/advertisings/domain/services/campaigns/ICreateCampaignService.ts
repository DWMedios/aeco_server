import type { ICampaign } from '@common/domain/entities'
import type { CreateCampaignDto } from '../../dto/campaigns/CreateCampaign.dto'

export const CREATE_CAMPAIGN_SERVICE = Symbol('ICreateCampaignService')

export interface ICreateCampaignService {
  run(data: CreateCampaignDto): Promise<ICampaign>
}
