import type { ISetting } from '@common/domain/entities'
import type { CreateSettingsDto } from 'src/company/domain/dto/CreateSettingsDto'
import type { UpdateSettingsDto } from 'src/company/domain/dto/UpdateSettingsDto'

export const SETTING_REPOSITORY = Symbol('ISettingRepository')

export interface ISettingRepository {
  exists(companyId: number): Promise<boolean>
  create(settings: CreateSettingsDto): Promise<ISetting>
  find(companyId: number): Promise<ISetting>
  update(data: UpdateSettingsDto, id: number): Promise<ISetting>
}
