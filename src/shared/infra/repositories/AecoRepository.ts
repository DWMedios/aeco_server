import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import type { IAecoRepository } from '@shared/domain/repositories'
import { Aeco, AecoStatus } from '@common/infra/entities'
import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from '../../../aecos/domain/dto/AecoDto'
import type { UpdateAecoDto } from '../../../aecos/domain/dto/UpdateAecoDto'

export class AecoRepository implements IAecoRepository {
  constructor(
    @InjectRepository(Aeco)
    private readonly repository: Repository<IAeco>,
  ) {}
  async exists(filter: {
    id?: number
    serialNumber?: string
    name?: string
  }): Promise<boolean> {
    if (!filter) return false

    const whereClause: { id?: number; name?: string } = {}

    if (filter.id) whereClause.id = filter.id
    if (filter.name) whereClause.name = filter.name

    return this.repository.exists({ where: whereClause })
  }

  async find(id: number): Promise<Partial<IAeco>> {
    return this.repository.findOne({
      where: { id: id },
    })
  }

  async create(aeco: CreateAecoDto): Promise<Partial<IAeco>> {
    const qb = await this.repository
      .createQueryBuilder('aeco')
      .insert()
      .values(aeco as IAeco)
      .returning('*')
      .execute()
    return qb.raw[0]
  }

  async update(aeco: UpdateAecoDto, id: number): Promise<Partial<IAeco>> {
    const qb = await this.repository
      .createQueryBuilder('aeco')
      .update()
      .set(aeco as IAeco)
      .where('id = :id', { id: id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async initialSetup(serialNumber: string): Promise<IAeco | null> {
    return this.repository
      .createQueryBuilder('aeco')
      .leftJoinAndSelect('aeco.company', 'company')
      .leftJoinAndSelect('company.settings', 'settings')
      .leftJoinAndSelect('aeco.pages', 'pages')
      .leftJoinAndSelect('aeco.rewardCategories', 'rewardCategories')
      .select([
        'aeco.id',
        'aeco.name',
        'company.id',
        'company.name',
        'settings.id',
        'settings.logoUrl',
        'settings.metadata',
        'pages.id',
        'pages.name',
        'pages.metadata',
        'rewardCategories.id',
        'rewardCategories.name',
        'rewardCategories.order',
        'rewardCategories.status',
      ])
      .where('aeco.serialNumber = :serialNumber', { serialNumber })
      .andWhere('aeco.status = :aecoStatus', { aecoStatus: AecoStatus.ENABLED })
      .andWhere('aeco.initialSetup = :initialSetup', { initialSetup: true })
      .getOne()
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder('aeco')
      .delete()
      .where('id = :id', { id: id })
      .execute()

    return result.affected !== 0
  }
}
