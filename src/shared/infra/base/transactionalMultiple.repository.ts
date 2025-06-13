import { Repository, EntityManager } from 'typeorm'

type RepositoryMap = Record<string, Repository<any>>

export abstract class TransactionalMultipleRepository<T extends RepositoryMap> {
  constructor(protected readonly repositories: T) {}

  protected repository<K extends keyof T>(
    key: K,
    manager?: EntityManager,
  ): T[K] {
    const repo = this.repositories[key]
    if (!manager) return repo

    const entity = (repo as Repository<any>).target
    return manager.getRepository(entity) as T[K]
  }
}
