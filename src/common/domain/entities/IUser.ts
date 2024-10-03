import type { IBase } from './IBase'
import type { ICompany } from './ICompany'
import type { IUserCompanyPermissions } from './IPermission'

export interface IUser extends IBase {
  name: string
  email: string
  phone?: string | null
  position?: string | null
  photoUrl?: string | null
  gender?: string | null
  password?: string | null
  companyId?: number | null
  companies: ICompany[]
  userCompanyPermissions: IUserCompanyPermissions[]
}
