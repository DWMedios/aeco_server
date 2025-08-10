import {
  Inject,
  Logger,
  HttpCode,
  Controller,
  HttpStatus,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common'
import {
  RESET_EXTERNAL_PASSWORD_SERVICE,
  type IResetExternalPasswordService,
} from '@auth/domain/services/IResetExternalPasswordService'
import { AuthVerifyJwtGuard } from '../guards/auth-verify-jwt.guard'
import { CurrentForgotPasswordUser } from '@shared/app/decorators/current-logged.decorator'
import { ForgotPasswordDecodedUser } from '@shared/domain/Types'
import { ResetPasswordDto } from '@auth/domain/dto/reset-password.dto'

@Controller('auth')
export class ResetPasswordExternalController {
  logger = new Logger(ResetPasswordExternalController.name)

  constructor(
    @Inject(RESET_EXTERNAL_PASSWORD_SERVICE)
    private readonly service: IResetExternalPasswordService,
  ) {}

  @Post('forgot-password/reset')
  @UseGuards(AuthVerifyJwtGuard)
  @HttpCode(HttpStatus.OK)
  async resetPasswordExternal(
    @CurrentForgotPasswordUser()
    currentUser: ForgotPasswordDecodedUser,
    @Body() payload: ResetPasswordDto,
  ): Promise<{ success: boolean }> {
    return await this.service.run(currentUser, payload.password)
  }
}
