import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CREATE_USER_SERVICE,
  type ICreateUserService,
} from '@users/domain/services/ICreateUserService'
import { CreateUserDto } from '../../domain/dto/CreateUser.dto'
import { UsersRoleGuard } from '../guards/users-role.guard'

@ApiTags('Usuarios')
@Controller('users')
export class PostUserController {
  logger = new Logger(PostUserController.name)

  constructor(
    @Inject(CREATE_USER_SERVICE)
    private readonly service: ICreateUserService,
  ) {}

  @Post()
  @UseGuards(UsersRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Usuario creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'El email ya está registrado',
  })
  async createUser(@Body() payload: CreateUserDto) {
    return await this.service.run(payload)
  }
}
