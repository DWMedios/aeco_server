import type { EntityManager } from 'typeorm'
import type { IAecoRequestHistory } from '@common/domain/entities'

export const AECO_REQUEST_HISTORY_REPOSITORY = Symbol(
  'IAecoRequestHistoryRepository',
)

export interface IAecoRequestHistoryRepository {
  findManyBy(
    aecoId: number,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory[] | null>
  create(
    aecoReq: Partial<IAecoRequestHistory>,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory>
  partialUpdate(
    exists: IAecoRequestHistory,
    aecoReq: Partial<IAecoRequestHistory>,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
