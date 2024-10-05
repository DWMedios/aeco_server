import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import type { IAecoRepository } from '@shared/domain/repositories'
import { Aeco, AecoStatus } from '@common/infra/entities'
import type { IAeco } from '@common/domain/entities'

export class AecoRepository implements IAecoRepository {
  constructor(
    @InjectRepository(Aeco)
    private readonly repository: Repository<IAeco>,
  ) {}

  initialSetup(serialNumber: string): Promise<IAeco | null> {
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
}
