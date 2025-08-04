import type { IBase } from './IBase'
import type { IUser } from './IUser'
import type { UserInviteStatusEnum } from '@common/domain/enums/UserInvite.status.enum'

export interface IUserInvite extends IBase {
  readonly name: string
  readonly email: string
  readonly status: UserInviteStatusEnum
  readonly token: string
  readonly invitedById?: number
  readonly invitedUserId?: number
  invitedBy?: IUser
  invitedUser?: IUser
}
