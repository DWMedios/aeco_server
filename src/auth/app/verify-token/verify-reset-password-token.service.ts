import { Inject, Injectable, Logger } from '@nestjs/common'
import {
  ROLE_REPOSITORY,
  type IRoleRepository,
} from '@shared/domain/repositories'
import type { ForgotPasswordDecodedUser } from '@shared/domain/Types'
import type { IVerifyResetPasswordTokenService } from '@auth/domain/services/IVerifyResetPasswordService'

@Injectable()
export class VerifyResetPasswordTokenService
  implements IVerifyResetPasswordTokenService
{
  logger = new Logger(VerifyResetPasswordTokenService.name)

  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async run(payload: ForgotPasswordDecodedUser): Promise<{ success: boolean }> {
    const { sub, email } = payload
    const userRole = await this.roleRepository.findBy({
      userEmail: email,
      apiKey: sub,
      isActive: true,
      isUserVerified: true,
    })

    return { success: !!userRole }
  }
}
