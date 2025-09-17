import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import {
  ROLE_REPOSITORY,
  USER_INVITE_REPOSITORY,
  USER_REPOSITORY,
  type IRoleRepository,
  type IUserInviteRepository,
  type IUserRepository,
} from '@shared/domain/repositories'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { VerifiiedUserDecodedUser } from '@shared/domain/Types'
import type { IUserInvite } from '@common/domain/entities/IUserInvite'
import { UserInviteStatusEnum } from '@common/domain/enums/UserInviteStatus.enum'
import type { IVerifyEmailTokenService } from '@auth/domain/services/IVerifyEmailTokenService'

@Injectable()
export class VerifyEmailTokenService implements IVerifyEmailTokenService {
  logger = new Logger(VerifyEmailTokenService.name)

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
    @Inject(USER_INVITE_REPOSITORY)
    private readonly userInviteRepository: IUserInviteRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(payload: VerifiiedUserDecodedUser): Promise<{ success: boolean }> {
    const { sub, email } = payload
    const userRole = await this.roleRepository.findBy({
      userEmail: email,
      apiKey: sub,
      isActive: true,
      isUserVerified: false,
    })

    if (!userRole) {
      return { success: false }
    }

    const verifyTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let inviteUpdated: IUserInvite | null = null
        try {
          inviteUpdated = await this.userInviteRepository.updateById(
            payload.inviteId,
            {
              status: UserInviteStatusEnum.ACCEPTED,
            },
            manager,
          )
        } catch (error) {
          this.logger.error(error)
          throw new InternalServerErrorException(
            'Error al actualizar el estado de la invitación para verificación de email',
          )
        }

        if (inviteUpdated) {
          try {
            await this.userRepository.updateById(
              inviteUpdated.invitedUserId,
              {
                isVerified: true,
              },
              manager,
            )
          } catch (error) {
            this.logger.error(error)
            throw new InternalServerErrorException(
              'Error al actualizar el usuario como verificado',
            )
          }
        }
        return inviteUpdated
      },
    )

    return { success: !!verifyTransaction }
  }
}
