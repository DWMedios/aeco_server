import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  DELETE_USER_SERVICE,
  type IDeleteUserService,
} from '@users/domain/services/IDeleteUserService'
import { UsersRoleGuard } from '../guards/users-role.guard'

@ApiTags('Usuarios')
@Controller('users')
export class DeleteUserController {
  logger = new Logger(DeleteUserController.name)

  constructor(
    @Inject(DELETE_USER_SERVICE)
    private readonly service: IDeleteUserService,
  ) {}

  @Delete(':id')
  @UseGuards(UsersRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar un usuario existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a eliminar',
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
