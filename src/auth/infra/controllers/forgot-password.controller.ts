import { ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  FORGOT_PASSWORD_SERVICE,
  type IForgotPasswordService,
} from '@auth/domain/services/IForgotPasswordService'
import { ForgotPasswordDto } from '@auth/domain/dto/forgot-password.dto'

@ApiTags('Autenticación')
@Controller('auth')
export class ForgotPasswordController {
  logger = new Logger(ForgotPasswordController.name)

  constructor(
    @Inject(FORGOT_PASSWORD_SERVICE)
    private readonly service: IForgotPasswordService,
  ) {}

  @Post('forgot-password')
  @HttpCode(HttpStatus.CREATED)
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ success: boolean }> {
    return this.service.run(forgotPasswordDto)
  }
}
