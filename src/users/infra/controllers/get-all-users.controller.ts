import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_ALL_USER_SERVICE,
  type IFindAllUserService,
} from '@users/domain/services/IFindAllUserService'
import { UserFiltersDto } from '@shared/domain/dto/Filters.dto'
import { DecodedUser } from '@shared/domain/Types'
import { CurrentUser } from '@shared/app/decorators/current-user.decorator'
import { UsersRoleGuard } from '../guards/users-role.guard'

@Controller('users')
export class GetAllUsersController {
  logger = new Logger(GetAllUsersController.name)

  constructor(
    @Inject(FIND_ALL_USER_SERVICE)
    private readonly service: IFindAllUserService,
  ) {}

  @Get()
  @UseGuards(UsersRoleGuard)
  @HttpCode(HttpStatus.OK)
  async getAllUsers(
    @CurrentUser('user') user: DecodedUser,
    @Query() filters: UserFiltersDto,
  ) {
    return await this.service.run(user, filters)
  }
}
