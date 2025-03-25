import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Reward } from '@common/infra/entities'
import type { IReward } from '@common/domain/entities'
import type { IRewardRepository } from '@shared/domain/repositories'
import { RewardFiltersDto } from '@shared/domain/dto/Filters.dto'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class RewardRepository
  extends TransactionalRepository<IReward>
  implements IRewardRepository
{
  constructor(
    @InjectRepository(Reward)
    readonly entityRepository: Repository<IReward>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<IReward | null> {
    return this.repository(manager)
      .createQueryBuilder('reward')
      .leftJoinAndSelect('reward.aecos', 'aecos')
      .select([
        'reward.id',
        'reward.name',
        'reward.establishment',
        'reward.description',
        'reward.note',
        'reward.image',
        'reward.status',
        'reward.type',
        'reward.order',
        'reward.metadata',
        'reward.createdAt',
        'reward.updatedAt',
        'aecos.id',
        'aecos.folio',
        'aecos.name',
        'aecos.serialNumber',
        'aecos.status',
      ])
      .where('reward.id = :id', { id })
      .getOne()
  }

  findAll(
    filters: RewardFiltersDto,
    manager?: EntityManager,
  ): Promise<[IReward[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('rewards')
      .loadRelationCountAndMap('rewards.totalAecos', 'rewards.aecos')
      .select([
        'rewards.id',
        'rewards.name',
        'rewards.establishment',
        'rewards.description',
        'rewards.note',
        'rewards.image',
        'rewards.status',
        'rewards.type',
        'rewards.order',
        'rewards.createdAt',
        'rewards.updatedAt',
      ])

    if (filters?.name) {
      qb.andWhere('LOWER(unaccent(BTRIM(rewards.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters?.description) {
      qb.andWhere(
        'LOWER(unaccent(BTRIM(rewards.description))) ILIKE :description',
        { description: `%${filters.description}%` },
      )
    }

    if (filters?.establishment) {
      qb.andWhere(
        'LOWER(unaccent(BTRIM(rewards.establishment))) ILIKE :establishment',
        { establishment: `%${filters.establishment}%` },
      )
    }

    if (filters?.note) {
      qb.andWhere('LOWER(unaccent(BTRIM(rewards.note))) ILIKE :note', {
        note: `%${filters.note}%`,
      })
    }

    if (filters?.status) {
      qb.andWhere('rewards.status = :status', { status: filters.status })
    }

    if (filters?.type) {
      qb.andWhere('rewards.type = :type', { type: filters.type })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`rewards.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  create(reward: Partial<IReward>, manager?: EntityManager): Promise<IReward> {
    const newReward = this.repository(manager).create(reward)
    return this.repository(manager).save(newReward)
  }

  updatePartial(
    exists: IReward,
    reward: Partial<IReward>,
    manager?: EntityManager,
  ): Promise<IReward> {
    const updatedReward = this.repository(manager).merge(exists, reward)
    return this.repository(manager).save(updatedReward)
  }

  async update(
    id: number,
    reward: Partial<IReward>,
    manager?: EntityManager,
  ): Promise<IReward> {
    const qb = await this.repository(manager)
      .createQueryBuilder('reward')
      .update()
      .set(reward)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('reward')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('reward')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('reward')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
