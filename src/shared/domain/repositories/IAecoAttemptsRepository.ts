import type { IAecoAttempts } from '@common/domain/entities'
import type { EntityManager } from 'typeorm'

export const AECO_ATTEMPTS_REPOSITORY = Symbol('IAecoAttemptsRepository')

export interface IAecoAttemptsRepository {
  findManyBySerialNumber(
    serialNumber: string,
    manager?: EntityManager,
  ): Promise<IAecoAttempts[]>
  create(
    aecoAttempt: Partial<IAecoAttempts>,
    manager?: EntityManager,
  ): Promise<IAecoAttempts>
  partialUpdate(
    exists: IAecoAttempts,
    aecoAttempt: Partial<IAecoAttempts>,
    manager?: EntityManager,
  ): Promise<IAecoAttempts>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
