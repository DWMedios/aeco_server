import { Repository, EntityManager } from 'typeorm'

export abstract class TransactionalRepository<T> {
  constructor(protected readonly entityRepository: Repository<T>) {}

  protected repository(manager?: EntityManager): Repository<T> {
    return manager
      ? manager.getRepository<T>(this.entityRepository.target)
      : this.entityRepository
  }
}
