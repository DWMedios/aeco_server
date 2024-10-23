import type { ICompany, ISetting } from '@common/domain/entities'

export class CompanySettingSerializer {
  readonly id: number

  readonly companyId: number

  readonly key: string

  readonly logoUrl: string

  readonly metadata: Record<string, any>[]

  readonly company: ICompany

  constructor(partial: Partial<CompanySettingSerializer>) {
    Object.assign(this, partial)
  }

  static fromCompanySetting(
    settings: ISetting,
    logoUrl: string = null,
  ): CompanySettingSerializer {
    return new CompanySettingSerializer({
      id: settings.id,
      companyId: settings.companyId,
      logoUrl: logoUrl,
      metadata: settings.metadata,
    })
  }
}
