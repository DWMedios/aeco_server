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
import { LoginUserDto } from '@auth/domain/dto/LoginUser.dto'

@Controller('auth')
export class LoginController {
  logger = new Logger(LoginController.name)

  constructor(
    @Inject(AUTH_SERVICE)
    private readonly service: IAuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() payload: LoginUserDto) {
    return await this.service.run(payload)
  }
}
