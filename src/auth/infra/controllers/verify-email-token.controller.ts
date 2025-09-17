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
  VERIFY_EMAIL_TOKEN_SERVICE,
  type IVerifyEmailTokenService,
} from '@auth/domain/services/IVerifyEmailTokenService'
import { AuthVerifyEmailJwtGuard } from '../guards/auth-verify-email-jwt.guard'
import { CurrentVerifyEmailUser } from '@shared/app/decorators/current-logged.decorator'
import { VerifiiedUserDecodedUser } from '@shared/domain/Types'

@Controller('auth')
export class VerifyEmailTokenController {
  logger = new Logger(VerifyEmailTokenController.name)

  constructor(
    @Inject(VERIFY_EMAIL_TOKEN_SERVICE)
    private readonly service: IVerifyEmailTokenService,
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
