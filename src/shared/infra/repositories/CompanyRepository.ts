import type { EntityManager, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from '@common/infra/entities'
import type { ICompanyFilterOptions } from '@company/domain/Types'
import type { ICompany } from '@common/domain/entities'
import type { ICompanyRepository } from '@shared/domain/repositories'
import type { CompanyFiltersDto } from '@shared/domain/dto/Filters.dto'
import { TransactionalRepository } from '../base/transactional.repository'
export class CompanyRepository
  extends TransactionalRepository<ICompany>
  implements ICompanyRepository
{
  constructor(
    @InjectRepository(Company)
    readonly entityRepository: Repository<ICompany>,
  ) {
    super(entityRepository)
  }

  exists(
    filter: ICompanyFilterOptions,
    manager?: EntityManager,
  ): Promise<boolean> {
    const whereClause: ICompanyFilterOptions = {}

    if (filter?.id) whereClause.id = filter.id
    if (filter?.name) whereClause.name = filter.name
    if (filter?.rfc) whereClause.rfc = filter.rfc

    return this.repository(manager).exists({ where: whereClause })
  }

  findById(id: number, manager?: EntityManager): Promise<ICompany | null> {
    return this.repository(manager)
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.aecos', 'aecos')
      .leftJoinAndSelect('company.mediaAsset', 'mediaAsset')
      .select([
        'company.id',
        'company.name',
        'company.rfc',
        'company.state',
        'company.city',
        'company.address',
        'company.postalCode',
        'company.phone',
        'company.status',
        'company.metadata',
        'company.legalRepresentative',
        'company.logoId',
        'company.createdAt',
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
      .where('company.id = :id', { id })
      .getOne()
  }

  findAll(
    filters: CompanyFiltersDto,
    manager?: EntityManager,
  ): Promise<[ICompany[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('companies')
      .loadRelationCountAndMap('companies.totalAecos', 'companies.aecos')
      .select([
        'companies.id',
        'companies.name',
        'companies.rfc',
        'companies.state',
        'companies.city',
        'companies.address',
        'companies.postalCode',
        'companies.phone',
        'companies.status',
        'companies.createdAt',
        'companies.legalRepresentative',
      ])

    if (filters?.name) {
      qb.orWhere('LOWER(unaccent(BTRIM(companies.name))) ILIKE :name', {
        name: `%${filters.name}%`,
      })
    }

    if (filters?.rfc) {
      qb.orWhere('UPPER(BTRIM(companies.rfc)) ILIKE :rfc', {
        rfc: `%${filters.rfc}%`,
      })
    }

    if (filters?.state) {
      qb.orWhere('LOWER(unaccent(BTRIM(companies.state))) ILIKE :state', {
        state: `%${filters.state}%`,
      })
    }

    if (filters?.city) {
      qb.orWhere('LOWER(unaccent(BTRIM(companies.city))) ILIKE :city', {
        city: `%${filters.city}%`,
      })
    }

    if (filters?.address) {
      qb.orWhere('LOWER(unaccent(BTRIM(companies.address))) ILIKE :address', {
        address: `%${filters.address}%`,
      })
    }

    if (filters?.postalCode) {
      qb.orWhere(
        'LOWER(unaccent(BTRIM(companies.postalCode))) ILIKE :postalCode',
        {
          postalCode: `%${filters.postalCode}%`,
        },
      )
    }

    if (filters?.phone) {
      qb.orWhere('LOWER(unaccent(BTRIM(companies.phone))) ILIKE :phone', {
        phone: `%${filters.phone}%`,
      })
    }

    if (filters?.status !== undefined) {
      qb.orWhere('companies.status = :status', { status: filters.status })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      qb.orderBy(`companies.${filters.orderByField}`, filters.orderByDirection)
    }

    return qb.getManyAndCount()
  }

  create(
    company: Partial<ICompany>,
    manager?: EntityManager,
  ): Promise<ICompany> {
    const newCompany = this.repository(manager).create(company)
    return this.repository(manager).save(newCompany)
  }

  partialUpdate(
    exists: ICompany,
    company: Partial<ICompany>,
    manager?: EntityManager,
  ): Promise<ICompany> {
    const updatedCompany = this.repository(manager).merge(exists, company)
    return this.repository(manager).save(updatedCompany)
  }

  async updateById(
    id: number,
    company: Partial<ICompany>,
    manager?: EntityManager,
  ): Promise<ICompany> {
    const qb = await this.repository(manager)
      .createQueryBuilder('company')
      .update()
      .set(company)
      .where('id = :id', { id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('company')
      .delete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('company')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const qb = await this.repository(manager)
      .createQueryBuilder('company')
      .restore()
      .where('id = :id', { id })
      .execute()

    return qb.affected !== 0
  }
}
