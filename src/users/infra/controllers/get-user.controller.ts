import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_USER_SERVICE,
  type IFindUserService,
} from '@users/domain/services/IFindUserService'
import { UsersRoleGuard } from '../guards/users-role.guard'

@ApiTags('Usuarios')
@Controller('users')
export class GetUserController {
  logger = new Logger(GetUserController.name)

  constructor(
    @Inject(FIND_USER_SERVICE)
    private readonly service: IFindUserService,
  ) {}

  @Get(':id')
  @UseGuards(UsersRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario encontrado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
