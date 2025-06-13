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
  RESET_PASSWORD_SERVICE,
  type IResetPasswordService,
} from '@auth/domain/services/IResetPasswordService'
import { ResetPasswordDto } from '@auth/domain/dto/ResetPassword.dto'
import { ResetPasswordGuard } from '../guards/reset-password.guard'

@ApiTags('Autenticación')
@Controller('auth')
export class ResetPasswordController {
  logger = new Logger(ResetPasswordController.name)

  constructor(
    @Inject(RESET_PASSWORD_SERVICE)
    private readonly service: IResetPasswordService,
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
  async login(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: ResetPasswordDto,
  ) {
    return await this.service.run(id, payload.password)
  }
}
