import type { IBase } from './IBase'
import type { ICompany } from './ICompany'
import type { IUserRolePermissions } from './IUserRolePermissions'

export interface IUser extends IBase {
  readonly name: string
  readonly email: string
  readonly phone?: string
  readonly position?: string
  readonly password?: string
  readonly isActive: boolean
  readonly companyId?: number
  company?: ICompany
  role?: IUserRolePermissions
}
