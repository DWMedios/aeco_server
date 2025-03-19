import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@shared/domain/repositories'
import type { DecodedUser } from '@shared/domain/Types'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'

@Injectable()
export class ResetPasswordGuard implements CanActivate {
  logger = new Logger(ResetPasswordGuard.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const currentUser = request['user'] as DecodedUser
    const method = request.method
    const userId = Number(request?.params.id ?? 0)
    const body = request?.body

    const roleType = currentUser.roleType
    const isSuperAdmin = roleType === UserRoleEntiyEnum.SUPER_ADMIN
    const isAdmin = roleType === UserRoleEntiyEnum.ADMIN

    if (!isSuperAdmin && !isAdmin) return false

    if (method === 'PUT') {
      if (!userId) return false
      if (isSuperAdmin) return true

      if (currentUser?.userId === userId) return false

      if (!body?.password) return false

      const userToUpdate = await this.userRepository.findById(userId)

      if (!userToUpdate) return false
      const currentUserCompany = currentUser?.company
      const userToUpdateComapny = userToUpdate?.company

      if (currentUserCompany?.id !== userToUpdateComapny?.id) return false

      return true
    }

    return false
  }
}
