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
  ROLE_REPOSITORY,
  USER_REPOSITORY,
  USER_INVITE_REPOSITORY,
  type IRoleRepository,
  type IUserRepository,
  type IUserInviteRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { IUser } from '@common/domain/entities'
import type { ForgotPasswordDecodedUser } from '@shared/domain/Types'
import type { IResetExternalPasswordService } from '@auth/domain/services/IResetExternalPasswordService'

@Injectable()
export class ResetExternalPasswordService
  implements IResetExternalPasswordService
{
  logger = new Logger(ResetExternalPasswordService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(USER_INVITE_REPOSITORY)
    private readonly userInviteRepository: IUserInviteRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    payload: ForgotPasswordDecodedUser,
    password: string,
  ): Promise<{ success: boolean }> {
    const userRole = await this.roleRepository.findBy({
      userEmail: payload.email,
      apiKey: payload.sub,
      isActive: true,
      isUserVerified: true,
    })
    if (!userRole) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const user = await this.userRepository.findByIdWithPassword(userRole.userId)
    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    const isSamePassword = await bcrypt.compare(password, user.password)

    if (isSamePassword) {
      throw new BadRequestException(
        'La nueva contraseña no puede ser igual a la anterior',
      )
    }

    const passwordResetTransaction =
      await this.transactionService.executeTransaction(async (manager) => {
        let userUpdated: IUser | null = null
        try {
          userUpdated = await this.userRepository.partialUpdate(
            user,
            { password },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al actualizar la contraseña',
          )
        }

        try {
          await this.userInviteRepository.updateById(
            payload.inviteId,
            {
              status: UserInviteStatusEnum.ACCEPTED,
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al actualizar el estado',
          )
        }
        return userUpdated
      })

    return { success: !!passwordResetTransaction }
  }
}
