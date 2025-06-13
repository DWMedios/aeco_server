import type { IBase } from './IBase'
import type { IUser } from './IUser'
import type { UserRoleEntiyEnum } from '../enums/UserRole.enum'

export interface IUserRolePermissions extends IBase {
  permissions: Record<string, boolean>[]
  readonly role: UserRoleEntiyEnum
  readonly apiKey: string
  readonly token: string
  readonly userId: number
  user: IUser
}
