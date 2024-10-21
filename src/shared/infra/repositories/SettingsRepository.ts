import { ISetting } from '@common/domain/entities'
import { Setting } from '@common/infra/entities'
import { InjectRepository } from '@nestjs/typeorm'
import { ISettingRepository } from '@shared/domain/repositories'
import { CreateSettingsDto } from 'src/company/domain/dto/CreateSettingsDto'
import { UpdateSettingsDto } from 'src/company/domain/dto/UpdateSettingsDto'
import { Repository } from 'typeorm'

export class SettingsRepository implements ISettingRepository {
  constructor(
    @InjectRepository(Setting)
    private readonly repository: Repository<ISetting>,
  ) {}

  async exists(companyId: number): Promise<boolean> {
    if (!companyId) return false

    return this.repository.exists({ where: { companyId } })
  }

  async find(companyId: number): Promise<ISetting> {
    return this.repository.findOne({ where: { companyId } })
  }

  async create(settings: CreateSettingsDto): Promise<ISetting> {
    const qb = await this.repository
      .createQueryBuilder('company_setting')
      .insert()
      .values(settings as ISetting)
      .returning('*')
      .execute()
    return qb.raw[0]
  }

  async update(data: UpdateSettingsDto, id: number): Promise<ISetting> {
    const qb = await this.repository
      .createQueryBuilder('company_settig')
      .update()
      .set(data)
      .where('id = :id', { id: id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }
}
