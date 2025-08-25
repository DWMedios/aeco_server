import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Campaign } from '@common/infra/entities'
import type { ICampaign } from '@common/domain/entities'
import type { CountByDay } from '@advertisings/domain/Types'
import type { ICampaignRepository } from '@shared/domain/repositories'
import type { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'
import { TransactionalRepository } from '../base/transactional.repository'

export class CampaignRepository
  extends TransactionalRepository<ICampaign>
  implements ICampaignRepository
{
  constructor(
    @InjectRepository(Campaign)
    readonly entityRepository: Repository<ICampaign>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<ICampaign | null> {
    return this.repository(manager)
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.mediaAsset', 'mediaAsset')
      .leftJoinAndSelect('campaign.contractor', 'contractor')
      .leftJoinAndSelect('contractor.mediaAsset', 'contractorMediaAsset')
      .leftJoinAndSelect('campaign.company', 'company')
      .leftJoinAndSelect('campaign.aecos', 'aecos')
      .select([
        'campaign.id',
        'campaign.contractName',
        'campaign.description',
        'campaign.startDate',
        'campaign.endDate',
        'campaign.isEnabled',
        'campaign.planDescription',
        'campaign.reproductionLimit',
        'campaign.planDurationDays',
        'campaign.contractorId',
        'campaign.mediaId',
        'campaign.companyId',
        'campaign.createdAt',
        'mediaAsset.id',
        'mediaAsset.fileKey',
        'mediaAsset.originalName',
        'mediaAsset.mimeType',
        'contractor.id',
        'contractor.name',
        'contractor.email',
        'contractor.phone',
        'contractor.logoId',
        'contractorMediaAsset.id',
        'contractorMediaAsset.fileKey',
        'contractorMediaAsset.originalName',
        'contractorMediaAsset.mimeType',
        'aecos.id',
        'aecos.folio',
        'aecos.name',
        'aecos.serialNumber',
        'aecos.status',
        'aecos.isOnline',
        'company.id',
        'company.name',
      ])
      .where('campaign.id = :id', { id })
      .getOne()
  }

  findAll(
    filters: CampaignFiltersDto,
    manager?: EntityManager,
  ): Promise<[ICampaign[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('campaigns')
      .leftJoinAndSelect('campaigns.mediaAsset', 'mediaAsset')
      .leftJoinAndSelect('campaigns.contractor', 'contractor')
      .leftJoinAndSelect('contractor.mediaAsset', 'contractorMediaAsset')
      .leftJoinAndSelect('campaigns.company', 'company')
      .loadRelationCountAndMap('campaigns.totalAecos', 'campaigns.aecos')
      .select([
        'campaigns.id',
        'campaigns.contractName',
        'campaigns.description',
        'campaigns.startDate',
        'campaigns.endDate',
        'campaigns.isEnabled',
        'campaigns.planDescription',
        'campaigns.reproductionLimit',
        'campaigns.planDurationDays',
        'campaigns.contractorId',
        'campaigns.mediaId',
        'campaigns.companyId',
        'campaigns.createdAt',
        'mediaAsset.id',
        'mediaAsset.fileKey',
        'mediaAsset.originalName',
        'mediaAsset.mimeType',
        'contractor.id',
        'contractor.name',
        'contractor.email',
        'contractor.phone',
        'contractor.logoId',
        'contractorMediaAsset.id',
        'contractorMediaAsset.fileKey',
        'contractorMediaAsset.originalName',
        'contractorMediaAsset.mimeType',
        'company.id',
        'company.name',
        'company.status',
      ])

    if (filters?.contractName) {
      qb.andWhere(
        'LOWER(unaccent(BTRIM(campaigns.contractName))) ILIKE :contractName',
        {
          contractName: `%${filters.contractName}%`,
        },
      )
    }

    if (filters?.companyId) {
      qb.andWhere('campaigns.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    if (filters?.description) {
      qb.andWhere(
        'LOWER(unaccent(BTRIM(campaigns.description))) ILIKE :description',
        {
          description: `%${filters.description}%`,
        },
      )
    }
    if (filters?.companyName) {
      qb.andWhere('LOWER(unaccent(BTRIM(company.name))) ILIKE :companyName', {
        companyName: `%${filters.companyName}%`,
      })
    }

    if (filters?.startDate) {
      qb.andWhere(
        `campaigns.startDate = date_trunc('day', CAST(:startDate AS TIMESTAMP WITH TIME ZONE))`,
        { startDate: filters.startDate },
      )
    }
    if (filters?.endDate) {
      qb.andWhere(
        `campaigns.endDate = date_trunc('day', CAST(:endDate AS TIMESTAMP WITH TIME ZONE))`,
        { endDate: filters.endDate },
      )
    }
    if (filters?.isEnabled !== undefined) {
      qb.andWhere('campaigns.isEnabled = :isEnabled', {
        isEnabled: filters.isEnabled,
      })
    }
    if (filters?.contractorId) {
      qb.andWhere('campaigns.contractorId = :contractorId', {
        contractorId: filters.contractorId,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`campaigns.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  findManyByCompanyId(
    ids: number[],
    companyId: number,
    manager?: EntityManager,
  ): Promise<ICampaign[]> {
    return this.repository(manager)
      .createQueryBuilder('campaigns')
      .select(['campaigns.id', 'campaigns.companyId'])
      .where('campaigns.companyId = :companyId', { companyId })
      .andWhere('campaigns.isEnabled = true')
      .andWhere('campaigns.id IN (:...ids)', { ids })
      .getMany()
  }

  findByDatePeriod(
    companyId: number,
    startDate: Date,
    endDate: Date,
    manager?: EntityManager,
  ): Promise<CountByDay[]> {
    const qb = this.repository(manager)
      .createQueryBuilder('campaigns')
      .select([
        "to_char(dates.date, 'DD Mon YYYY') AS date",
        'COUNT(campaigns.id)::int as count',
      ])
      .from(
        `(SELECT generate_series(
          date_trunc('day', CAST(:startDate AS TIMESTAMP WITH TIME ZONE)),
          date_trunc('day', CAST(:endDate AS TIMESTAMP WITH TIME ZONE)),
          INTERVAL '1 day'
        ) AS date)`,
        'dates',
      )
      .where('campaigns.companyId = :companyId', { companyId })
      .andWhere('campaigns.isEnabled = true')
      .andWhere("dates.date >= date_trunc('day', campaigns.startDate)")
      .andWhere("dates.date <= date_trunc('day', campaigns.endDate)")
      .setParameters({
        startDate,
        endDate,
      })
      .groupBy('dates.date')
      .orderBy('dates.date', 'ASC')

    return qb.getRawMany()
  }

  create(
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign> {
    const newCampaign = this.repository(manager).create(campaign)
    return this.repository(manager).save(newCampaign)
  }

  partialUpdate(
    exists: ICampaign,
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign> {
    const updatedCampaign = this.repository(manager).merge(exists, campaign)
    return this.repository(manager).save(updatedCampaign)
  }

  async updateById(
    id: number,
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .update()
      .set(campaign)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async updateManyByCompany(
    companyId: number,
    campaign: Partial<ICampaign>,
    manager?: EntityManager,
  ): Promise<ICampaign[]> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .update()
      .set(campaign)
      .where('companyId = :companyId', { companyId })
      .returning('*')
      .execute()

    return qb.raw
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDeleteManyByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .softDelete()
      .where('companyId = :companyId', { companyId })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
