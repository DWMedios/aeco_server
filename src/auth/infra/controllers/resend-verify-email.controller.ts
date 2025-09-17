import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Post,
  Param,
  Inject,
  Logger,
  HttpCode,
  Controller,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common'
import {
  RESEND_VERIFY_EMAIL_SERVICE,
  type IResendVerifyEmailService,
} from '@auth/domain/services/IResendVerifyEmailService'

@ApiTags('Autenticación')
@Controller('auth')
export class ResendVerifyEmailController {
  logger = new Logger(ResendVerifyEmailController.name)

  constructor(
    @Inject(RESEND_VERIFY_EMAIL_SERVICE)
    private readonly service: IResendVerifyEmailService,
  ) {}

  @Post('users/:id/resend-verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiOperation({ summary: 'Reenviar correo de verificación de email' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Correo de verificación reenviado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async resendVerifyEmail(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
