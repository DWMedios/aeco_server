import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import type { IAecoRepository } from '@shared/domain/repositories'
import { Aeco } from '@common/infra/entities'
import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from '../../../aecos/domain/dto/AecoDto'
import type { UpdateAecoDto } from '../../../aecos/domain/dto/UpdateAecoDto'
import { AecoStatus } from '../../../aecos/domain/enums/AecoStatus.enum'

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

    const whereClause: { id?: number; name?: string; serialNumber?: string } =
      {}

    if (filter.id) whereClause.id = filter.id
    if (filter.name) whereClause.name = filter.name
    if (filter.serialNumber) whereClause.serialNumber = filter.serialNumber

    return this.repository.exists({ where: whereClause })
  }

  async find(id: number): Promise<IAeco> {
    return this.repository.findOne({
      where: { id: id },
    })
  }

  async findBySerialNumber(serialNumber: string): Promise<IAeco> {
    return this.repository.findOne({
      where: { serialNumber: serialNumber },
    })
  }

  async create(aeco: CreateAecoDto): Promise<IAeco> {
    const newAeco = this.repository.create(aeco as IAeco)
    return this.repository.save(newAeco)
  }

  async update(exists: IAeco, aeco: UpdateAecoDto): Promise<IAeco> {
    const updatedAeco = this.repository.merge(exists, aeco as IAeco)
    return this.repository.save(updatedAeco)
  }

  async initialSetup(serialNumber: string): Promise<IAeco | null> {
    console.log(
      '🚀 ~ AecoRepository ~ initialSetup ~ serialNumber:',
      serialNumber,
    )
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
      .andWhere('aeco.initialSetup = :initialSetup', { initialSetup: false })
      .getOne()
  }

  async getUpdates(serialNumber: string): Promise<IAeco> {
    return this.repository.findOne({
      where: { serialNumber },
    })
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
