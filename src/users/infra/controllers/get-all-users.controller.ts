import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
import { UserFiltersDto } from '@users/domain/dto/Filters.dto'
import { DecodedUser } from '@shared/domain/Types'
import { CurrentUser } from '@shared/app/decorators/current-logged.decorator'
import { UsersRoleGuard } from '../guards/users-role.guard'

@ApiTags('Usuarios')
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
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de usuarios obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async getAllUsers(
    @CurrentUser() user: DecodedUser,
    @Query() filters: UserFiltersDto,
  ) {
    return await this.service.run(user, filters)
  }
}
