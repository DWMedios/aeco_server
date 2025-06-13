import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  FIND_REWARD_SERVICE,
  type IFindRewardService,
} from '@rewards/domain/services/IFindRewardService'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@ApiTags('Recompensas')
@Controller('rewards')
export class GetRewardController {
  logger = new Logger(GetRewardController.name)

  constructor(
    @Inject(FIND_REWARD_SERVICE)
    private readonly service: IFindRewardService,
  ) {}

  @Get(':id')
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Obtener una recompensa',
    description: 'Obtiene una recompensa específica por su ID',
  })
  @ApiParam({ name: 'id', description: 'ID de la recompensa', type: Number })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recompensa encontrada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recompensa no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Acceso prohibido, requiere permisos',
  })
  async getOneReward(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
