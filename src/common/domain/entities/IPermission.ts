import type { IBase } from './IBase'
import type { ICompany } from './ICompany'
import type { IUser } from './IUser'
import { UserRole } from '../../infra/entities/Permission.entity'

export interface IUserCompanyPermissions extends IBase {
  permissions: Record<string, boolean>[]
  role: UserRole
  userId: number
  companyId: number
  user: IUser
  company: ICompany
}
