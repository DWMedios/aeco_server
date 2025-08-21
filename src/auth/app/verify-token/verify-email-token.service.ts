import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import {
  ROLE_REPOSITORY,
  USER_INVITE_REPOSITORY,
  type IRoleRepository,
  type IUserInviteRepository,
} from '@shared/domain/repositories'
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
  ) {}

  async run(payload: VerifiiedUserDecodedUser): Promise<{ success: boolean }> {
    const { sub, email } = payload
    const userRole = await this.roleRepository.findBy({
      userEmail: email,
      apiKey: sub,
      isActive: true,
      isUserVerified: true,
    })

    if (!userRole) {
      return { success: false }
    }

    let inviteUpdated: IUserInvite | null = null
    try {
      inviteUpdated = await this.userInviteRepository.updateById(
        payload.inviteId,
        {
          status: UserInviteStatusEnum.ACCEPTED,
        },
      )
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException(
        'Error al actualizar el estado de la invitación para verificación de email',
      )
    }

    return { success: !!inviteUpdated }
  }
}
