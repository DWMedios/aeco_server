import type { EntityManager } from 'typeorm'
import type { IReward } from '@common/domain/entities'
import type { RewardFiltersDto } from '../dto/Filters.dto'

export const REWARD_REPOSITORY = Symbol('IRewardRepository')

export interface IRewardRepository {
  findById(id: number, manager?: EntityManager): Promise<IReward | null>
  findAll(
    filters: RewardFiltersDto,
    companyId?: number,
    manager?: EntityManager,
  ): Promise<[IReward[], number]>
  findByIdAndCompany(
    id: number,
    companyId: number,
    manager?: EntityManager,
  ): Promise<IReward | null>
  create(reward: Partial<IReward>, manager?: EntityManager): Promise<IReward>
  updatePartial(
    exists: IReward,
    reward: Partial<IReward>,
    manager?: EntityManager,
  ): Promise<IReward>
  update(
    id: number,
    reward: Partial<IReward>,
    manager?: EntityManager,
  ): Promise<IReward>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
