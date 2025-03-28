import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Setting } from '@common/infra/entities'
import type { ISetting } from '@common/domain/entities'
import type { ISettingRepository } from '@shared/domain/repositories'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class SettingsRepository
  extends TransactionalRepository<ISetting>
  implements ISettingRepository
{
  constructor(
    @InjectRepository(Setting)
    readonly entityRepository: Repository<ISetting>,
  ) {
    super(entityRepository)
  }

  async existsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    return this.repository(manager).exists({ where: { companyId } })
  }

  async findByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<ISetting | null> {
    return this.repository(manager).findOne({ where: { companyId } })
  }

  async create(
    settings: Partial<ISetting>,
    manager?: EntityManager,
  ): Promise<ISetting> {
    const qb = await this.repository(manager)
      .createQueryBuilder('company_setting')
      .insert()
      .values(settings)
      .returning('*')
      .execute()
    return qb.raw[0]
  }

  async update(
    id: number,
    data: Partial<ISetting>,
    manager?: EntityManager,
  ): Promise<ISetting> {
    const qb = await this.repository(manager)
      .createQueryBuilder('company_settig')
      .update()
      .set(data)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }
}
