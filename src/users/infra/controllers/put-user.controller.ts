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
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return await this.service.run(id, payload)
  }
}
