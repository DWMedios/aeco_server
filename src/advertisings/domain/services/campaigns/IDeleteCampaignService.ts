export const DELETE_CAMPAIGN_SERVICE = Symbol('IDeleteCampaignService')

export interface IDeleteCampaignService {
  run(id: number): Promise<{ success: boolean }>
}
