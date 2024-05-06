import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDto } from './domain/dto/UserDto';
import { USER_SERVICE, type IUserService } from './domain/IUserService';

@Controller('user')
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly userService: IUserService,
  ) {}

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }
}
