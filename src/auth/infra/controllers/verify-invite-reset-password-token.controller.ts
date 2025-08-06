import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
} from '@nestjs/common'
import {
  VERIFY_RESET_PASSWORD_TOKEN_SERVICE,
  type IVerifyResetPasswordTokenService,
} from '@auth/domain/services/IVerifyResetPasswordService'
import { ForgotPasswordDecodedUser } from '@shared/domain/Types'

@Controller('auth')
export class VerifyInviteResetPasswordTokenController {
  logger = new Logger(VerifyInviteResetPasswordTokenController.name)

  constructor(
    @Inject(VERIFY_RESET_PASSWORD_TOKEN_SERVICE)
    private readonly service: IVerifyResetPasswordTokenService,
  ) {}

  // @UseGuards(JwtAuthGuardFactory('forgotPassword'))
  @Get('forgot-password/verify')
  @HttpCode(HttpStatus.OK)
  async verifyResetPasswordToken(
    // @CurrentUser('passwordResetUser')
    passwordResetUser: ForgotPasswordDecodedUser,
  ) {
    return await this.service.run(passwordResetUser)
  }
}
