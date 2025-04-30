import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Contractor } from '@common/infra/entities'
import type { IContractor } from '@common/domain/entities'
import type { IContractorRepository } from '@shared/domain/repositories'
import type { ContractorFiltersDto } from '@advertisings/domain/dto/Filters.dto'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class ContractorRepository
  extends TransactionalRepository<IContractor>
  implements IContractorRepository
{
  constructor(
    @InjectRepository(Contractor)
    readonly entityRepository: Repository<IContractor>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<IContractor | null> {
    return this.repository(manager)
      .createQueryBuilder('contractor')
      .leftJoinAndSelect('contractor.company', 'company')
      .leftJoinAndSelect('contractor.mediaAsset', 'mediaAsset')
      .select([
        'contractor.id',
        'contractor.name',
        'contractor.email',
        'contractor.phone',
        'contractor.logoId',
        'contractor.companyId',
        'contractor.createdAt',
        'company.id',
        'company.name',
        'company.status',
        'mediaAsset.id',
        'mediaAsset.fileKey',
        'mediaAsset.originalName',
        'mediaAsset.mimeType',
        'mediaAsset.fileSize',
        'mediaAsset.assetType',
      ])
      .where('contractor.id = :id', { id })
      .getOne()
  }

  findByIdAndCompany(
    id: number,
    companyId: number,
    manager?: EntityManager,
  ): Promise<IContractor | null> {
    return this.repository(manager)
      .createQueryBuilder('contractor')
      .select(['contractor.id', 'contractor.status', 'contractor.companyId'])
      .where('contractor.id = :id', { id })
      .andWhere('contractor.companyId = :companyId', { companyId })
      .andWhere('contractor.deletedAt IS NULL')
      .getOne()
  }

  findAll(
    filters: ContractorFiltersDto,
    manager?: EntityManager,
  ): Promise<[IContractor[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('contractors')
      .leftJoinAndSelect('contractors.company', 'company')
      .leftJoinAndSelect('contractors.mediaAsset', 'mediaAsset')
      .select([
        'contractors.id',
        'contractors.name',
        'contractors.email',
        'contractors.phone',
        'contractors.logoId',
        'contractors.companyId',
        'contractors.createdAt',
        'company.id',
        'company.name',
        'company.status',
        'mediaAsset.id',
        'mediaAsset.fileKey',
        'mediaAsset.originalName',
        'mediaAsset.mimeType',
      ])

    if (filters?.companyId) {
      qb.orWhere('contractors.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    if (filters?.name) {
      qb.orWhere('LOWER(unaccent(BTRIM(contractors.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters?.email) {
      qb.orWhere('LOWER(unaccent(BTRIM(contractors.email))) ILIKE :email', {
        email: `%${filters.email}%`,
      })
    }

    if (filters?.phone) {
      qb.orWhere('LOWER(unaccent(BTRIM(contractors.phone))) ILIKE :phone', {
        phone: `%${filters.phone}%`,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(
        `contractors.${filters.orderByField}`,
        filters.orderByDirection,
      )
    }

    return qb.getManyAndCount()
  }

  create(
    contractor: Partial<IContractor>,
    manager?: EntityManager,
  ): Promise<IContractor> {
    const newContractor = this.repository(manager).create(contractor)
    return this.repository(manager).save(newContractor)
  }

  updatePartial(
    exists: IContractor,
    contractor: Partial<IContractor>,
    manager?: EntityManager,
  ): Promise<IContractor> {
    const updatedContractor = this.repository(manager).merge(exists, contractor)
    return this.repository(manager).save(updatedContractor)
  }

  async updateById(
    id: number,
    contractor: Partial<IContractor>,
    manager?: EntityManager,
  ): Promise<IContractor> {
    const qb = await this.repository(manager)
      .createQueryBuilder('contractor')
      .update()
      .set(contractor)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('contractor')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('contractor')
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
      .createQueryBuilder('contractor')
      .softDelete()
      .where('companyId = :companyId', { companyId })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('contractor')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
