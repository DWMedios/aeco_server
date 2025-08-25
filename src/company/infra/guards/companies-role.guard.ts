import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import type { DecodedUser } from '@shared/domain/Types'
import { UserRoleEntityEnum } from '@common/domain/enums/UserRole.enum'

@Injectable()
export class CompaniesRoleGuard implements CanActivate {
  logger = new Logger(CompaniesRoleGuard.name)

  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const currentUser = request['user'] as DecodedUser
    // const method = request.method
    // const userId = Number(request?.params.id ?? 0)

    const roleType = currentUser.roleType
    const isSuperAdmin = roleType === UserRoleEntityEnum.SUPER_ADMIN
    const isAdmin = roleType === UserRoleEntityEnum.ADMIN

    return !isSuperAdmin && !isAdmin
  }
}
