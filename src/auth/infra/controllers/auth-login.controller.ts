import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  AUTH_SERVICE,
  type IAuthService,
} from '@auth/domain/services/IAuthService'
import { LoginUserDto } from '@auth/domain/dto/login-user.dto'

@ApiTags('Autenticación')
@Controller('auth')
export class LoginController {
  logger = new Logger(LoginController.name)

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly service: IAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Inicio de sesión de usuario' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario autenticado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Credenciales inválidas',
  })
  async login(@Body() payload: LoginUserDto) {
    return await this.service.run(payload)
  }
}
