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
  async createUser(@Body() payload: CreateUserDto) {
    return await this.service.run(payload)
  }
}
