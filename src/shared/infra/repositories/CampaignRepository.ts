import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Campaign } from '@common/infra/entities'
import type { ICampaign } from '@common/domain/entities'
import type { ICampaignRepository } from '@shared/domain/repositories'
import { TransactionalRepository } from '../base/transactional.repository'
import { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'

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
      .leftJoinAndSelect('campaign.aecos', 'aecos')
      .select([
        'campaign.id',
        'campaign.contractName',
        'campaign.description',
        'campaign.startDate',
        'campaign.endDate',
        'campaign.isEnabled',
        'campaign.mediaId',
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
      .loadRelationCountAndMap('companies.totalAecos', 'companies.aecos')
      .select([
        'campaigns.id',
        'campaigns.contractName',
        'campaigns.description',
        'campaigns.startDate',
        'campaigns.endDate',
        'campaigns.isEnabled',
        'campaigns.mediaId',
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
      ])

    if (filters?.contractName) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(campaigns.contractName))) ILIKE :contractName',
        {
          contractName: `%${filters.contractName}%`,
        },
      )
    }

    if (filters?.description) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(campaigns.description))) ILIKE :description',
        {
          description: `%${filters.description}%`,
        },
      )
    }
    if (filters?.companyName) {
      qb.orWhere('LOWER(unaccent(BTRIM(companies.name))) ILIKE :companyName', {
        companyName: `%${filters.companyName}%`,
      })
    }

    if (filters?.startDate) {
      qb.orWhere(
        `campaigns.startDate = date_trunc('day', CAST(:startDate AS TIMESTAMP WITH TIME ZONE))`,
        { startDate: filters.startDate },
      )
    }
    if (filters?.endDate) {
      qb.orWhere(
        `campaigns.endDate = date_trunc('day', CAST(:endDate AS TIMESTAMP WITH TIME ZONE))`,
        { endDate: filters.endDate },
      )
    }
    if (filters?.isEnabled) {
      qb.orWhere('campaigns.isEnabled = :isEnabled', {
        isEnabled: filters.isEnabled,
      })
    }
    if (filters?.contractorId) {
      qb.orWhere('campaigns.contractorId = :contractorId', {
        contractorId: filters.contractorId,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`campaigns.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
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

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('campaign')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
