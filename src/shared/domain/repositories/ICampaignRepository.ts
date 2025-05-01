import type { EntityManager } from 'typeorm'
import type { ICampaign } from '@common/domain/entities'
import type { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'
import type { CountByDay } from '@advertisings/domain/Types'

export const CAMPAIGN_REPOSITORY = Symbol('ICampaignRepository')

export interface ICampaignRepository {
  findById(id: number, manager?: EntityManager): Promise<ICampaign | null>
  findAll(
    filters: CampaignFiltersDto,
    manager?: EntityManager,
  ): Promise<[ICampaign[], number]>
  findByDatePeriod(
    companyId: number,
    startDate: Date,
    endDate: Date,
    manager?: EntityManager,
  ): Promise<CountByDay[]>
  create(
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign>
  partialUpdate(
    exists: ICampaign,
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign>
  updateById(
    id: number,
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
