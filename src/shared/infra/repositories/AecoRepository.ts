import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Aeco } from '@common/infra/entities'
import type { IAeco } from '@common/domain/entities'
import type {
  IAecoFilterManyOptions,
  IAecoFilterOptions,
} from '@aecos/domain/Types'
import type { AecoFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IAecoRepository } from '@shared/domain/repositories'
import { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import { TransactionalRepository } from '../base/transactional.repository'

export class AecoRepository
  extends TransactionalRepository<IAeco>
  implements IAecoRepository
{
  constructor(
    @InjectRepository(Aeco)
    readonly entityRepository: Repository<IAeco>,
  ) {
    super(entityRepository)
  }

  findBy(
    filters: IAecoFilterOptions,
    manager?: EntityManager,
  ): Promise<IAeco | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('aeco')
      .leftJoinAndSelect('aeco.company', 'company')
      .select([
        'aeco.id',
        'aeco.folio',
        'aeco.name',
        'aeco.status',
        'aeco.isOnline',
        'aeco.initialSetup',
        'aeco.needsUpdate',
        'aeco.serialNumber',
        'aeco.currentCoords',
        'company.id',
        'company.name',
      ])

    if (filters?.id) {
      qb.andWhere('aeco.id = :id', { id: filters.id })
    }

    if (filters?.serialNumber) {
      qb.andWhere('aeco.serialNumber = :serialNumber', {
        serialNumber: filters.serialNumber,
      })
    }

    if (filters?.folio) {
      qb.andWhere('aeco.folio = :folio', { folio: filters.folio })
    }

    if (filters?.companyId) {
      qb.andWhere('aeco.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    if (filters?.status) {
      qb.andWhere('aeco.status = :status', { status: filters.status })
    }

    if (filters?.name) {
      qb.andWhere('LOWER(unaccent(BTRIM(aeco.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    return qb.getOne()
  }

  count(): Promise<number> {
    return this.repository().count({ withDeleted: true })
  }

  findAll(
    filters: AecoFiltersDto,
    manager?: EntityManager,
  ): Promise<[IAeco[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('aecos')
      .leftJoinAndSelect('aecos.company', 'company')
      .select([
        'aecos.id',
        'aecos.folio',
        'aecos.name',
        'aecos.status',
        'aecos.isOnline',
        'aecos.initialSetup',
        'aecos.needsUpdate',
        'aecos.serialNumber',
        'aecos.currentCoords',
        'aecos.createdAt',
        'company.id',
        'company.name',
      ])

    if (filters?.serialNumber) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(aecos.serialNumber))) ILIKE :serialNumber',
        {
          serialNumber: `%${filters.serialNumber}%`,
        },
      )
    }

    if (filters?.folio) {
      qb.orWhere('LOWER(unaccent(BTRIM(aecos.folio))) ILIKE :folio', {
        folio: `%${filters.folio}%`,
      })
    }

    if (filters?.name) {
      qb.orWhere('LOWER(unaccent(BTRIM(aecos.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters?.companyId) {
      qb.orWhere('aecos.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    if (filters?.withoutCompany === true) {
      qb.orWhere('aecos.companyId IS NULL')
    }

    if (filters?.withoutCompany === false) {
      qb.orWhere('aecos.companyId IS NOT NULL')
    }

    if (filters?.status) {
      qb.orWhere('aecos.status = :status', { status: filters.status })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`aecos.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  findManyByIds(
    filters: IAecoFilterManyOptions,
    manager?: EntityManager,
  ): Promise<IAeco[]> {
    const qb = this.repository(manager)
      .createQueryBuilder('aecos')
      .select(['aecos.id', 'aecos.name'])
      .where('aecos.id IN (:...ids)', { ids: filters.ids })
      .andWhere('aecos.status = :status', {
        status: AecoStatusEnum.ENABLED,
      })

    if (filters?.companyNullable === true) {
      qb.andWhere('aecos.companyId IS NULL')
    }

    if (filters?.companyId) {
      qb.andWhere('(aecos.companyId = :companyId OR aecos.companyId IS NULL)', {
        companyId: filters.companyId,
      })
    }

    return qb.getMany()
  }

  getRewardsByAeco(id: number, manager?: EntityManager): Promise<IAeco | null> {
    return this.repository(manager)
      .createQueryBuilder('aeco')
      .leftJoinAndSelect('aeco.rewards', 'rewards')
      .select([
        'aeco.id',
        'rewards.id',
        'rewards.name',
        'rewards.establishment',
        'rewards.description',
        'rewards.note',
        'rewards.image',
        'rewards.status',
        'rewards.type',
        'rewards.order',
        'rewards.metadata',
      ])
      .where('aeco.id = :id', { id })
      .getOne()
  }

  create(aeco: Partial<IAeco>, manager?: EntityManager): Promise<IAeco> {
    const newAeco = this.repository(manager).create(aeco)
    return this.repository(manager).save(newAeco)
  }

  partialUpdate(
    exists: IAeco,
    aeco: Partial<IAeco>,
    manager?: EntityManager,
  ): Promise<IAeco> {
    const updatedAeco = this.repository(manager).merge(exists, aeco)
    return this.repository(manager).save(updatedAeco)
  }

  initialSetup(
    serialNumber: string,
    manager?: EntityManager,
  ): Promise<IAeco | null> {
    return this.repository(manager)
      .createQueryBuilder('aeco')
      .leftJoinAndSelect('aeco.company', 'company')
      .leftJoinAndSelect('aeco.pages', 'pages')
      .leftJoinAndSelect('aeco.rewardCategories', 'rewardCategories')
      .select([
        'aeco.id',
        'aeco.name',
        'company.id',
        'company.name',
        'pages.id',
        'pages.name',
        'pages.metadata',
        'rewardCategories.id',
        'rewardCategories.name',
        'rewardCategories.order',
        'rewardCategories.status',
      ])
      .where('aeco.serialNumber = :serialNumber', { serialNumber })
      .andWhere('aeco.status = :aecoStatus', {
        aecoStatus: AecoStatusEnum.ENABLED,
      })
      .andWhere('aeco.initialSetup = :initialSetup', { initialSetup: true })
      .getOne()
  }
  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('aeco')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
