import type { ICampaign } from '@common/domain/entities'

export const FIND_CAMPAIGN_SERVICE = Symbol('IFindCampaignService')

export interface IFindCampaignService {
  run(id: number): Promise<ICampaign & { mediaUrl?: string }>
}
