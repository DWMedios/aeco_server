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
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
