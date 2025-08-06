import * as bcrypt from 'bcrypt'
import { ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common'
import {
  USER_REPOSITORY,
  ROLE_REPOSITORY,
  type IUserRepository,
  type IRoleRepository,
} from '@shared/domain/repositories'
import {
  JWT_SERVICE,
  type IJwtService,
} from '@auth/domain/services/IJwtService'
import type { DecodedUser } from '@shared/domain/Types'
import type { LoginUserDto } from '@auth/domain/dto/login-user.dto'
import type { IAuthService } from '@auth/domain/services/IAuthService'

@Injectable()
export class AuthService implements IAuthService {
  logger = new Logger(AuthService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async run(login: LoginUserDto) {
    const user = await this.userRepository.findForValidation(login.email)

    if (!user || !user.password || !user.isActive || !user.role) {
      this.logger.error('Usuario no encontrado')
      throw new ForbiddenException('Usuario no encontrado')
    }

    const isSamePassword = await bcrypt.compare(login.password, user.password)

    if (!isSamePassword) {
      this.logger.error('Contraseña incorrecta')
      throw new ForbiddenException('Contraseña incorrecta')
    }

    const role = user.role
    const company = user?.company

    const payload: Partial<DecodedUser> = {
      sub: role.apiKey,
      username: user?.name,
      email: user?.email,
      roleType: role.role,
      company: {
        id: company?.id,
        name: company?.name,
      },
    }

    const token = this.jwtService.sign(payload)

    try {
      await this.roleRepository.partialUpdate(role, { token })
    } catch (error) {
      this.logger.error(error)
    }

    return {
      access_token: token,
    }
  }
}
