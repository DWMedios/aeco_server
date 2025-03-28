import { Request } from 'express'
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common'
import type { DecodedUser } from '@shared/domain/Types'
import {
  REWARD_REPOSITORY,
  type IRewardRepository,
} from '@shared/domain/repositories'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'

@Injectable()
export class RewardRoleGuard implements CanActivate {
  logger = new Logger(RewardRoleGuard.name)

  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: IRewardRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request['user'] as DecodedUser
    const method = request.method
    const rewardId = Number(request?.params.id ?? 0)
    const body = request?.body

    const roleType = user.roleType
    const isSuperAdmin = roleType === UserRoleEntiyEnum.SUPER_ADMIN
    const isAdmin = roleType === UserRoleEntiyEnum.ADMIN

    if (!isSuperAdmin && !isAdmin) return false

    if (method === 'GET') {
      if (isSuperAdmin) return true

      if (rewardId) {
        const companyId = user?.company.id
        const rewardCompany = await this.rewardRepository.findByIdAndCompany(
          rewardId,
          companyId,
        )
        return !!rewardCompany
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
      if (!rewardId) return false
      if (isSuperAdmin) return true

      const companyId = user?.company.id
      const rewardCompany = await this.rewardRepository.findByIdAndCompany(
        rewardId,
        companyId,
      )
      return !!rewardCompany
    }

    return false
  }
}
