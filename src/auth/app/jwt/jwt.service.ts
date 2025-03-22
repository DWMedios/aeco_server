import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '@shared/domain/repositories'
import type { DecodedUser } from '@shared/domain/Types'
import type { IJwtService } from '@auth/domain/services/IJwtService'

@Injectable()
export class JwtService implements IJwtService {
  logger = new Logger(JwtService.name)
  private readonly expiresIn: string
  private readonly secret: string

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    private readonly configService: ConfigService,
  ) {
    const expInt = this.configService.get<number>('jwt.expInt')
    const timeStr = this.configService.get<string>('jwt.timeStr')
    this.expiresIn = `${expInt} ${timeStr}`
    this.secret = this.configService.get<string>('jwt.secret')
  }

  sign(payload: Partial<DecodedUser>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  async verify(token: string): Promise<DecodedUser> {
    try {
      const decoded = jwt.verify(token, this.secret) as DecodedUser
      const role = await this.roleRepository.findByApiKeyAndToken(
        decoded.sub,
        token,
        decoded.roleType,
      )

      if (!role) {
        throw new UnauthorizedException('Usuario no permitido')
      }

      const user = role?.user

      if (!user) {
        throw new UnauthorizedException('Usuario no permitido')
      }

      const company = user?.company

      return {
        ...decoded,
        userId: role.userId,
        username: user?.name,
        email: user?.email,
        roleType: role.role,
        company: {
          id: company?.id,
          name: company?.name,
        },
      }
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedException('Usuario no permitido')
    }
  }
}
