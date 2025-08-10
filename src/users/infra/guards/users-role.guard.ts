import { Request } from 'express'
import {
  Inject,
  Logger,
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '@shared/domain/repositories'
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'
import type { DecodedUser } from '@shared/domain/Types'

@Injectable()
export class UsersRoleGuard implements CanActivate {
  logger = new Logger(UsersRoleGuard.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request['user'] as DecodedUser
    const method = request.method
    const userid = Number(request?.params.id ?? 0)
    const body = request?.body

    const roleType = user.roleType
    const isSuperAdmin = roleType === UserRoleEntityEnum.SUPER_ADMIN
    const isAdmin = roleType === UserRoleEntityEnum.ADMIN

    if (!isSuperAdmin && !isAdmin) return false

    if (method === 'GET') {
      if (isSuperAdmin) return true

      if (userid) {
        const companyId = user?.company.id
        const userCompany = await this.userRepository.findOneByCompany(
          userid,
          companyId,
        )
        return !!userCompany
      }
      return true
    }

    if (method === 'POST') {
      if (isSuperAdmin) return true

      if (!body?.companyId) return false

      const companyId = user?.company.id
      return body?.companyId === companyId
    }

    if (method === 'PUT' || method === 'DELETE') {
      if (!userid) return false
      if (isSuperAdmin) return true

      const companyId = user?.company.id
      const userCompany = await this.userRepository.findOneByCompany(
        userid,
        companyId,
      )
      return !!userCompany
    }

    return false
  }
}
