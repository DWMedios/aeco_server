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

@Injectable()
export class AuthVerifyJwtGuard implements CanActivate {
  logger = new Logger(AuthVerifyJwtGuard.name)
  constructor(
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('El token es requerido')
    }

    try {
      const decoded = await this.jwtService.verifyResetPassword(token)
      if (!decoded) {
        throw new UnauthorizedException('Token no válido')
      }
      request['forgotPasswordUser'] = decoded
      return true
    } catch (err) {
      this.logger.error(err)
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
