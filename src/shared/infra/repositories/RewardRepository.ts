import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Reward } from '@common/infra/entities'
import type { IReward } from '@common/domain/entities'
import type { IRewardRepository } from '@shared/domain/repositories'
import type { RewardFiltersDto } from '@rewards/domain/dto/Filters.dto'
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
      .leftJoinAndSelect('reward.company', 'company')
      .leftJoinAndSelect('reward.mediaAsset', 'mediaAsset')
      .select([
        'reward.id',
        'reward.name',
        'reward.establishment',
        'reward.description',
        'reward.note',
        'reward.status',
        'reward.type',
        'reward.order',
        'reward.metadata',
        'reward.imageId',
        'reward.companyId',
        'reward.createdAt',
        'reward.updatedAt',
        'company.id',
        'company.name',
        'company.status',
        'aecos.id',
        'aecos.folio',
        'aecos.name',
        'aecos.serialNumber',
        'aecos.status',
        'mediaAsset.id',
        'mediaAsset.fileKey',
        'mediaAsset.originalName',
        'mediaAsset.mimeType',
        'mediaAsset.fileSize',
        'mediaAsset.assetType',
      ])
      .where('reward.id = :id', { id })
      .getOne()
  }

  findByIdAndCompany(
    id: number,
    companyId: number,
    manager?: EntityManager,
  ): Promise<IReward | null> {
    return this.repository(manager)
      .createQueryBuilder('reward')
      .select(['reward.id', 'reward.status', 'reward.companyId'])
      .where('reward.id = :id', { id })
      .andWhere('reward.companyId = :companyId', { companyId })
      .andWhere('reward.deletedAt IS NULL')
      .getOne()
  }

  findAll(
    filters: RewardFiltersDto,
    companyId?: number,
    manager?: EntityManager,
  ): Promise<[IReward[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('rewards')
      .loadRelationCountAndMap('rewards.totalAecos', 'rewards.aecos')
      .leftJoinAndSelect('rewards.company', 'company')
      .select([
        'rewards.id',
        'rewards.name',
        'rewards.establishment',
        'rewards.description',
        'rewards.note',
        'rewards.status',
        'rewards.type',
        'rewards.order',
        'rewards.metadata',
        'rewards.imageId',
        'rewards.companyId',
        'rewards.createdAt',
        'rewards.updatedAt',
        'company.id',
        'company.name',
        'company.status',
      ])

    if (companyId) {
      qb.orWhere('rewards.companyId = :companyId', { companyId })
    }

    if (filters?.name) {
      qb.orWhere('LOWER(unaccent(BTRIM(rewards.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters?.description) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(rewards.description))) ILIKE :description',
        { description: `%${filters.description}%` },
      )
    }

    if (filters?.establishment) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(rewards.establishment))) ILIKE :establishment',
        { establishment: `%${filters.establishment}%` },
      )
    }

    if (filters?.note) {
      qb.orWhere('LOWER(unaccent(BTRIM(rewards.note))) ILIKE :note', {
        note: `%${filters.note}%`,
      })
    }

    if (filters?.status) {
      qb.orWhere('rewards.status = :status', { status: filters.status })
    }

    if (filters?.type) {
      qb.orWhere('rewards.type = :type', { type: filters.type })
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

  async updateById(
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

  async softDeleteByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('reward')
      .softDelete()
      .where('companyId = :companyId', { companyId })
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
