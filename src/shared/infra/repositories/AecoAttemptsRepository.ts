import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { AecoAttempts } from '@common/infra/entities'
import type { IAecoAttempts } from '@common/domain/entities'
import type { IAecoAttemptsRepository } from '@shared/domain/repositories/IAecoAttemptsRepository'
import { TransactionalRepository } from '../base/transactional.repository'

export class AecoAttemptsRepository
  extends TransactionalRepository<IAecoAttempts>
  implements IAecoAttemptsRepository
{
  constructor(
    @InjectRepository(AecoAttempts)
    readonly entityRepository: Repository<IAecoAttempts>,
  ) {
    super(entityRepository)
  }

  findManyBySerialNumber(
    serialNumber: string,
    manager?: EntityManager,
  ): Promise<IAecoAttempts[]> {
    const qb = this.repository(manager)
      .createQueryBuilder('aeco_attempts')
      .select([
        'aeco_attempts.id',
        'aeco_attempts.serialNumber',
        'aeco_attempts.ipAddress',
        'aeco_attempts.reason',
        'aeco_attempts.requestData',
        'aeco_attempts.geolocation',
        'aeco_attempts.errorMessage',
      ])
      .where('aeco_attempts.serialNumber = :serialNumber', {
        serialNumber,
      })
      .orderBy('aeco_attempts.createdAt', 'DESC')

    return qb.getMany()
  }

  create(
    aecoAttempt: Partial<IAecoAttempts>,
    manager?: EntityManager,
  ): Promise<IAecoAttempts> {
    const newAecoAttempt = this.repository(manager).create(aecoAttempt)
    return this.repository(manager).save(newAecoAttempt)
  }

  partialUpdate(
    exists: IAecoAttempts,
    aecoAttempt: Partial<IAecoAttempts>,
    manager?: EntityManager,
  ): Promise<IAecoAttempts> {
    const updatedAecoAttempt = this.repository(manager).merge(
      exists,
      aecoAttempt,
    )
    return this.repository(manager).save(updatedAecoAttempt)
  }

  async updateById(
    id: number,
    aecoAttempt: Partial<IAecoAttempts>,
    manager?: EntityManager,
  ): Promise<IAecoAttempts> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_attempts')
      .update()
      .set(aecoAttempt)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_attempts')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_attempts')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco_attempts')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
