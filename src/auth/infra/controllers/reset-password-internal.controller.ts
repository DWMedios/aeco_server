import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  RESET_INTERNAL_PASSWORD_SERVICE,
  type IResetInternalPasswordService,
} from '@auth/domain/services/IResetInternalPasswordService'
import { ResetPasswordDto } from '@auth/domain/dto/reset-password.dto'
import { ResetPasswordGuard } from '../guards/reset-password.guard'

@ApiTags('Autenticación')
@Controller('auth')
export class ResetPasswordInternalController {
  logger = new Logger(ResetPasswordInternalController.name)

  constructor(
    @Inject(RESET_INTERNAL_PASSWORD_SERVICE)
    private readonly service: IResetInternalPasswordService,
  ) {}

  @Put('users/:id/reset-password')
  @UseGuards(ResetPasswordGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restablecimiento de contraseña de usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contraseña restablecida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async resetPasswordInternal(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ResetPasswordDto,
  ) {
    return await this.service.run(id, payload.password)
  }
}
