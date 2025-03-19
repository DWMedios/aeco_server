import type { EntityManager } from 'typeorm'

export const TRANSACTION_SERVICE = Symbol('TransactionServiceInterface')

export interface TransactionServiceInterface {
  executeTransaction<T>(
    work: (manager: EntityManager) => Promise<T>,
  ): Promise<T>
}
