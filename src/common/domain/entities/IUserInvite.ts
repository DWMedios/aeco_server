import type { IBase } from './IBase'
import type { IUser } from './IUser'
import type { UserInviteTypeEnum } from '../enums/UserInviteType.enum'
import type { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'

export interface IUserInvite extends IBase {
  readonly email: string
  readonly inviteType: UserInviteTypeEnum
  readonly status: UserInviteStatusEnum
  readonly token: string
  readonly invitedById?: number
  readonly invitedUserId?: number
  invitedBy?: IUser
  invitedUser?: IUser
}
