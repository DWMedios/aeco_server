import {
  Get,
  Inject,
  Logger,
  HttpCode,
  Controller,
  HttpStatus,
  UseGuards,
} from '@nestjs/common'
import {
  VERIFY_RESET_PASSWORD_TOKEN_SERVICE,
  type IVerifyResetPasswordTokenService,
} from '@auth/domain/services/IVerifyResetPasswordService'
import { AuthVerifyJwtGuard } from '../guards/auth-verify-jwt.guard'
import { CurrentForgotPasswordUser } from '@shared/app/decorators/current-logged.decorator'
import { ForgotPasswordDecodedUser } from '@shared/domain/Types'

@Controller('auth')
export class VerifyResetPasswordTokenController {
  logger = new Logger(VerifyResetPasswordTokenController.name)

  constructor(
    @Inject(VERIFY_RESET_PASSWORD_TOKEN_SERVICE)
    private readonly service: IVerifyResetPasswordTokenService,
  ) {}

  @Get('forgot-password/verify')
  @UseGuards(AuthVerifyJwtGuard)
  @HttpCode(HttpStatus.OK)
  async verifyResetPasswordToken(
    @CurrentForgotPasswordUser()
    passwordResetUser: ForgotPasswordDecodedUser,
  ): Promise<boolean> {
    return await this.service.run(passwordResetUser)
  }
}
