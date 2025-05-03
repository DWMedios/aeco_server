import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
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
  UPDATE_USER_SERVICE,
  type IUpdateUserService,
} from '@users/domain/services/IUpdateUserService'
import { UpdateUserDto } from '../../domain/dto/UpdateUser.dto'
import { UsersRoleGuard } from '../guards/users-role.guard'

@ApiTags('Usuarios')
@Controller('users')
export class PutUserController {
  logger = new Logger(PutUserController.name)

  constructor(
    @Inject(UPDATE_USER_SERVICE)
    private readonly service: IUpdateUserService,
  ) {}

  @Put(':id')
  @UseGuards(UsersRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar un usuario existente' })
  @ApiParam({
    name: 'id',
    description: 'ID del usuario a actualizar',
    example: 1,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Usuario actualizado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Usuario no encontrado',
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
    description: 'El email ya está registrado por otro usuario',
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.service.run(id, payload)
  }
}
