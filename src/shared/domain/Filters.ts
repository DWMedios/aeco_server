import type { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'

export interface UserRoleFilters {
  apiKey?: string
  role?: UserRoleEntiyEnum
  isActive?: boolean
  companyId?: number
  userId?: number
  userEmail?: string
}
