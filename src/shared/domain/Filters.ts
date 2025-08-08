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
