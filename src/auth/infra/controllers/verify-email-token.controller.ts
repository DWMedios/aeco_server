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
import { AuthVerifyEmailJwtGuard } from '../guards/auth-verify-email-jwt.guard'
import { CurrentVerifyEmailUser } from '@shared/app/decorators/current-logged.decorator'
import { VerifiiedUserDecodedUser } from '@shared/domain/Types'

@Controller('auth')
export class VerifyResetPasswordTokenController {
  logger = new Logger(VerifyResetPasswordTokenController.name)

  constructor(
    @Inject(VERIFY_RESET_PASSWORD_TOKEN_SERVICE)
    private readonly service: IVerifyResetPasswordTokenService,
  ) {}

  @Get('email/verify')
  @UseGuards(AuthVerifyEmailJwtGuard)
  @HttpCode(HttpStatus.OK)
  async verifyEmailToken(
    @CurrentVerifyEmailUser()
    payload: VerifiiedUserDecodedUser,
  ): Promise<{ success: boolean }> {
    return await this.service.run(payload)
  }
}
