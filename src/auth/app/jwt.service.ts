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
import type {
  DecodedUser,
  ForgotPasswordDecodedUser,
  VerifiiedUserDecodedUser,
} from '@shared/domain/Types'
import type { IJwtService } from '@auth/domain/services/IJwtService'

@Injectable()
export class JwtService implements IJwtService {
  logger = new Logger(JwtService.name)
  private readonly expiresIn: string
  private readonly secret: string
  private readonly secretReset: string

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    private readonly configService: ConfigService,
  ) {
    const expInt = this.configService.get<number>('jwt.exp_int')
    const timeStr = this.configService.get<string>('jwt.time_str')
    this.expiresIn = `${expInt} ${timeStr}`
    this.secret = this.configService.get<string>('jwt.secret')
    this.secretReset = this.configService.get<string>(
      'jwt.secret_reset_password',
    )
  }

  sign(payload: Partial<DecodedUser>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn })
  }

  signResetPassword(payload: { email: string; sub: string }): string {
    return jwt.sign(payload, this.secretReset, { expiresIn: this.expiresIn })
  }

  signVerifiedEmail(payload: {
    email: string
    sub: string
    companyName: string
  }): string {
    return jwt.sign(payload, this.secretReset, { expiresIn: this.expiresIn })
  }

  async verify(token: string): Promise<DecodedUser> {
    try {
      const decoded = jwt.verify(token, this.secret) as DecodedUser
      const role = await this.roleRepository.findByApiKey(
        decoded.sub,
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

  async verifyResetPassword(token: string): Promise<ForgotPasswordDecodedUser> {
    try {
      const decoded = jwt.verify(
        token,
        this.secretReset,
      ) as ForgotPasswordDecodedUser

      const role = await this.roleRepository.findBy({
        userEmail: decoded.email,
        apiKey: decoded.sub,
        isActive: true,
        isUserVerified: true,
      })

      if (!role) {
        throw new UnauthorizedException('Usuario no permitido')
      }

      const user = role?.user
      if (!user) {
        throw new UnauthorizedException('Usuario no permitido')
      }

      return {
        ...decoded,
        email: user.email,
        userId: role.userId,
        roleType: role.role,
        company: {
          id: user.company?.id,
          name: user.company?.name,
        },
      }
    } catch (error) {
      this.logger.error(error)
      throw new UnauthorizedException('Token no válido')
    }
  }

  async verifyEmail(token: string): Promise<VerifiiedUserDecodedUser> {
    try {
      const decoded = jwt.verify(
        token,
        this.secretReset,
      ) as VerifiiedUserDecodedUser

      const role = await this.roleRepository.findBy({
        userEmail: decoded.email,
        apiKey: decoded.sub,
        isActive: true,
      })

      if (!role) {
        this.logger.warn('Role not found for the provided token')
        throw new UnauthorizedException('Usuario no permitido')
      }

      const user = role?.user
      if (!user) {
        this.logger.warn('User not found for the provided role')
        throw new UnauthorizedException('Usuario no permitido')
      }

      return {
        ...decoded,
        email: user.email,
        userId: role.userId,
        roleType: role.role,
        company: {
          id: user.company?.id,
          name: user.company?.name,
        },
      }
    } catch (error) {
      this.logger.warn('Error verifying email token')
      this.logger.error(error)
      throw new UnauthorizedException('Token no válido')
    }
  }
}
