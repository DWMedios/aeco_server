import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Advertising } from '@common/infra/entities'
import type { IAdvertising } from '@common/domain/entities'
import type { FilterAdvertisingDto } from '@advertisings/domain/dto/Filters.dto'
import type { IAdvertisingRepository } from '@shared/domain/repositories'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class AdvertisingRepository
  extends TransactionalRepository<IAdvertising>
  implements IAdvertisingRepository
{
  constructor(
    @InjectRepository(Advertising)
    readonly entityRepository: Repository<IAdvertising>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<IAdvertising | null> {
    return this.repository(manager)
      .createQueryBuilder('advertising')
      .leftJoinAndSelect('advertising.company', 'company')
      .leftJoinAndSelect('advertising.contractors', 'contractors')
      .leftJoinAndSelect('advertising.campaigns', 'campaigns')
      .select([
        'advertising.id',
        'advertising.isEnabled',
        'advertising.companyId',
        'company.id',
        'company.name',
        'contractors.id',
        'contractors.name',
        'campaigns.id',
        'campaigns.contractName',
        'campaigns.isEnabled',
      ])
      .where('advertising.id = :id', { id })
      .getOne()
  }

  findManyByCompanyAndAeco(
    companyId: number,
    aecoId: number,
    manager?: EntityManager,
  ): Promise<IAdvertising[]> {
    return this.repository(manager)
      .createQueryBuilder('advertisings')
      .leftJoinAndSelect('advertisings.campaigns', 'campaigns')
      .leftJoinAndSelect('campaigns.contractors', 'contractors')
      .leftJoinAndSelect('campaigns.aecos', 'aecos')
      .leftJoinAndSelect('campaigns.mediaAsset', 'mediaAsset')
      .select([
        'advertisings.id',
        'advertisings.isEnabled',
        'advertisings.companyId',
        'campaigns.id',
        'campaigns.contractName',
        'campaigns.description',
        'campaigns.startDate',
        'campaigns.endDate',
        'campaigns.isEnabled',
        'campaigns.planDescription',
        'campaigns.reproductionLimit',
        'campaigns.planDurationDays',
        'campaigns.mediaId',
        'campaigns.contractorId',
        'campaigns.companyId',
        'contractors.id',
        'contractors.name',
        'mediaAsset.id',
        'mediaAsset.fileKey',
        'mediaAsset.originalName',
        'mediaAsset.mimeType',
        'mediaAsset.fileSize',
        'mediaAsset.assetType',
        'aecos.id',
      ])

      .where('advertisings.companyId = :companyId', { companyId })
      .andWhere('aecos.id = :aecoId', { aecoId })
      .andWhere('advertisings.isEnabled = :isEnabled', { isEnabled: true })
      .andWhere('campaigns.isEnabled = :isEnabled', { isEnabled: true })
      .getMany()
  }

  findAll(
    filters: FilterAdvertisingDto,
    manager?: EntityManager,
  ): Promise<[IAdvertising[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('advertisings')
      .leftJoinAndSelect('advertisings.company', 'company')
      .loadRelationCountAndMap(
        'advertisings.totalContractors',
        'advertisings.contractors',
      )
      .loadRelationCountAndMap(
        'advertisings.totalCampaigns',
        'advertisings.campaigns',
        'campaigns',
        (qb) =>
          qb.where('campaigns.isEnabled = :isEnabled', { isEnabled: true }),
      )
      .select([
        'advertisings.id',
        'advertisings.isEnabled',
        'advertisings.companyId',
        'advertisings.createdAt',
        'advertisings.updatedAt',
        'company.id',
        'company.name',
      ])

    if (filters?.companyName) {
      qb.orWhere('LOWER(unaccent(BTRIM(company.name))) ILIKE :companyName', {
        companyName: `%${filters.companyName}%`,
      })
    }

    if (filters?.isEnabled) {
      qb.orWhere('advertisings.isEnabled = :isEnabled', {
        isEnabled: filters.isEnabled,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(
        `advertisings.${filters.orderByField}`,
        filters.orderByDirection,
      )
    }

    return qb.getManyAndCount()
  }

  create(
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising> {
    const newAdvertising = this.repository(manager).create(advertising)
    return this.repository(manager).save(newAdvertising)
  }

  updatePartial(
    exists: IAdvertising,
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising> {
    const updatedAdvertising = this.repository(manager).merge(
      exists,
      advertising,
    )
    return this.repository(manager).save(updatedAdvertising)
  }

  async updateById(
    id: number,
    advertising: Partial<IAdvertising>,
    manager?: EntityManager,
  ): Promise<IAdvertising> {
    const qb = await this.repository(manager)
      .createQueryBuilder('advertising')
      .update()
      .set(advertising)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('advertising')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('advertising')
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
      .createQueryBuilder('advertising')
      .softDelete()
      .where('companyId = :companyId', { companyId })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('advertising')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
