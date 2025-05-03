import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  FIND_ALL_REWARD_SERVICE,
  type IFindAllRewardService,
} from '@rewards/domain/services/IFindAllRewardService'
import { DecodedUser } from '@shared/domain/Types'
import { RewardFiltersDto } from '@rewards/domain/dto/Filters.dto'
import { CurrentUser } from '@shared/app/decorators/current-logged.decorator'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@ApiTags('Recompensas')
@Controller('rewards')
export class GetAllRewardController {
  logger = new Logger(GetAllRewardController.name)

  constructor(
    @Inject(FIND_ALL_REWARD_SERVICE)
    private readonly service: IFindAllRewardService,
  ) {}

  @Get()
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Listar todas las recompensas',
    description:
      'Obtiene una lista de todas las recompensas disponibles con filtros opcionales',
  })
  @ApiQuery({
    type: RewardFiltersDto,
    required: false,
    description: 'Filtros para la búsqueda de recompensas',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de recompensas obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Acceso prohibido, requiere permisos',
  })
  async getAllRewards(
    @CurrentUser() user: DecodedUser,
    @Query() filters: RewardFiltersDto,
  ) {
    return await this.service.run(user, filters)
  }
}
