import { Request, Response, NextFunction } from 'express'
import {
  NestMiddleware,
  Injectable,
  UnauthorizedException,
  Logger,
  Inject,
  ForbiddenException,
} from '@nestjs/common'
import {
  JWT_SERVICE,
  type IJwtService,
} from '@auth/domain/services/IJwtService'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  logger = new Logger(AuthMiddleware.name)

  constructor(
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization }: any = req?.headers

    if (!authorization || authorization.trim() === '') {
      throw new UnauthorizedException('El token es requerido')
    }
    const authToken = authorization.replace(/bearer/gim, '').trim()
    const arrToken = authToken.split('.')
    const token = arrToken.join('.')

    if (!token) {
      throw new UnauthorizedException('El token es requerido')
    }

    try {
      const decoded = await this.jwtService.verify(token)
      if (!decoded) {
        throw new UnauthorizedException('Token no válido')
      }
      req['user'] = decoded
      next()
    } catch (error) {
      this.logger.error(error)
      throw new ForbiddenException('Token no válido')
    }
  }
}
