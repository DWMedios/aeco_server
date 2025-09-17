import type { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'
import type { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'

export interface UserRoleFilters {
  apiKey?: string
  role?: UserRoleEntityEnum
  isActive?: boolean
  companyId?: number
  userId?: number
  userEmail?: string
  isUserVerified?: boolean
}

export interface IUserInviteFilters {
  name?: string
  email?: string
  inviteType?: UserInviteTypeEnum
  status?: UserInviteStatusEnum
  token?: string
  invitedById?: number
  invitedUserId?: number
  userActive?: boolean
  userVerified?: boolean
}
