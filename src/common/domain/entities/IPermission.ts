import { UserRole } from '../../infra/entities/Permission.entity'
import type { ICompany } from './ICompany'
import type { IUser } from './IUser'

export interface IUserCompanyPermissions {
  permissions: Record<string, boolean>[]
  role: UserRole
  userId: number
  companyId: number
  user: IUser
  company: ICompany
}
