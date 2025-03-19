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
  async getOneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
