import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import type { DecodedUser } from '@shared/domain/Types'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'

@Injectable()
export class CompaniesRoleGuard implements CanActivate {
  logger = new Logger(CompaniesRoleGuard.name)

  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request['user'] as DecodedUser

    const roleType = user.roleType
    const isSuperAdmin = roleType === UserRoleEntiyEnum.SUPER_ADMIN

    return isSuperAdmin
  }
}
