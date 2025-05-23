import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AecoRequestHistory } from '@common/infra/entities'
import type { IAecoRequestHistory } from '@common/domain/entities'
import { TransactionalRepository } from '../base/transactional.repository'
import { IAecoRequestHistoryRepository } from '@shared/domain/repositories/IAecoRequestHistoryRepository'

export class AecoRequestHistoryRepository
  extends TransactionalRepository<IAecoRequestHistory>
  implements IAecoRequestHistoryRepository
{
  constructor(
    @InjectRepository(AecoRequestHistory)
    readonly entityRepository: Repository<IAecoRequestHistory>,
  ) {
    super(entityRepository)
  }

  findManyBy(
    aecoId: number,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory[] | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('aeco_request_history')
      .select([
        'aeco_request_history.id',
        'aeco_request_history.endpoint',
        'aeco_request_history.method',
        'aeco_request_history.ipAddress',
        'aeco_request_history.queryParams',
        'aeco_request_history.requestBody',
        'aeco_request_history.geolocation',
        'aeco_request_history.aecoId',
        'aeco_request_history.createdAt',
      ])
      .where('aeco_request_history.aecoId = :aecoId', { aecoId })
      .orderBy('aeco_request_history.createdAt', 'DESC')

    return qb.getMany()
  }

  create(
    aecoReq: Partial<IAecoRequestHistory>,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory> {
    const newAecoReq = this.repository(manager).create(aecoReq)
    return this.repository(manager).save(newAecoReq)
  }

  partialUpdate(
    exists: IAecoRequestHistory,
    aecoReq: Partial<IAecoRequestHistory>,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory> {
    const updatedAecoReq = this.repository(manager).merge(exists, aecoReq)
    return this.repository(manager).save(updatedAecoReq)
  }

  async updateById(
    id: number,
    aecoReq: Partial<IAecoRequestHistory>,
    manager?: EntityManager,
  ): Promise<IAecoRequestHistory> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_request_history')
      .update()
      .set(aecoReq)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_request_history')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_request_history')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_request_history')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
