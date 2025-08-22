import { Request } from 'express'
import {
  Inject,
  Logger,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import {
  JWT_SERVICE,
  type IJwtService,
} from '@auth/domain/services/IJwtService'
import {
  USER_INVITE_REPOSITORY,
  type IUserInviteRepository,
} from '@shared/domain/repositories'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import { UserInviteTypeEnum } from '@common/domain/enums/UserInviteType.enum'

@Injectable()
export class AuthVerifyEmailJwtGuard implements CanActivate {
  logger = new Logger(AuthVerifyEmailJwtGuard.name)
  constructor(
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
    @Inject(USER_INVITE_REPOSITORY)
    private readonly userInviteRepository: IUserInviteRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('El token es requerido')
    }
    const existingInvite = await this.userInviteRepository.findBy({
      token,
      inviteType: UserInviteTypeEnum.EMAIL_VERIFICATION,
      status: UserInviteStatusEnum.PENDING,
      userActive: true,
      userVerified: false,
    })

    if (!existingInvite) {
      throw new UnauthorizedException('Token no válido')
    }

    try {
      const decoded = await this.jwtService.verifyEmail(token)
      if (!decoded) {
        await this.userInviteRepository.partialUpdate(existingInvite, {
          status: UserInviteStatusEnum.CANCELLED,
        })
        throw new UnauthorizedException('Token no válido')
      }
      request['verifyEmailUser'] = {
        ...decoded,
        inviteId: existingInvite.id,
      }
      return true
    } catch (error) {
      this.logger.error(error)
      await this.userInviteRepository.partialUpdate(existingInvite, {
        status: UserInviteStatusEnum.CANCELLED,
      })

      throw new UnauthorizedException('Token no válido')
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers['authorization']
    if (!authHeader) return null

    const authToken = authHeader.replace(/bearer/gim, '').trim()
    const arrToken = authToken.split('.')
    const token = arrToken.join('.')
    return token ?? null
  }
}
