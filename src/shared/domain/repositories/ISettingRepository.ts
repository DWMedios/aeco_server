import type { EntityManager } from 'typeorm'
import type { ISetting } from '@common/domain/entities'

export const SETTING_REPOSITORY = Symbol('ISettingRepository')

export interface ISettingRepository {
  existsByCompany(companyId: number, manager?: EntityManager): Promise<boolean>
  findByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<ISetting | null>
  create(
    settings: Partial<ISetting>,
    manager?: EntityManager,
  ): Promise<ISetting>
  update(
    id: number,
    data: Partial<ISetting>,
    manager?: EntityManager,
  ): Promise<ISetting>
}
