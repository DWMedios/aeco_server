import type {
  IAeco,
  ICompany,
  IPromotion,
  IUser,
  IUserCompanyPermissions,
} from '@common/domain/entities'
import { CompanySettingSerializer } from './SetingsSerializer'

export class CompanySerializer {
  readonly id: number

  readonly name: string

  readonly rfc: string

  readonly settings?: CompanySettingSerializer

  readonly users?: IUser[]

  readonly userCompanyPermissions?: IUserCompanyPermissions[]

  readonly aecos?: IAeco[]

  readonly promotions?: IPromotion[]

  constructor(partial: Partial<CompanySerializer>) {
    Object.assign(this, partial)
  }

  static fromCompanyWithSettings(
    company: ICompany,
    fileUrl: string = null,
  ): CompanySerializer {
    return new CompanySerializer({
      id: company.id,
      name: company.name,
      rfc: company.rfc,
      settings: company.settings
        ? CompanySettingSerializer.fromCompanySetting(company.settings, fileUrl)
        : null,
    })
  }
}
