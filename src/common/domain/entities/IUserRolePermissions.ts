import type { IBase } from './IBase'
import type { IUser } from './IUser'
import type { UserRoleEntityEnum } from '../enums/UserRole.enum'

export interface IUserRolePermissions extends IBase {
  permissions: Record<string, boolean>[]
  readonly role: UserRoleEntityEnum
  readonly apiKey: string
  readonly token: string
  readonly userId: number
  user: IUser
}
