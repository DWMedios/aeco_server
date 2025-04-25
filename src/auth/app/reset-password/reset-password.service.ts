import * as bcrypt from 'bcrypt'
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@shared/domain/repositories'
import type { IResetPasswordService } from '@auth/domain/services/IResetPasswordService'

@Injectable()
export class ResetPasswordService implements IResetPasswordService {
  logger = new Logger(ResetPasswordService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async run(userid: number, password: string): Promise<{ success: boolean }> {
    const user = await this.userRepository.findByIdWithPassword(userid)

    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const isSamePassword = await bcrypt.compare(password, user.password)

    if (isSamePassword) {
      throw new BadRequestException(
        'La nueva contraseña no puede ser igual a la anterior',
      )
    }

    try {
      const userUpdated = await this.userRepository.partialUpdate(user, {
        password,
      })
      return { success: !!userUpdated }
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'Error al actualizar la contraseña',
      )
    }
  }
}
