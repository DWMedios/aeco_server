import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  DELETE_REWARD_SERVICE,
  type IDeleteRewardService,
} from '@rewards/domain/services/IDeleteRewardService'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@ApiTags('Recompensas')
@Controller('rewards')
export class DeleteRewardController {
  logger = new Logger(DeleteRewardController.name)

  constructor(
    @Inject(DELETE_REWARD_SERVICE)
    private readonly service: IDeleteRewardService,
  ) {}

  @Delete(':id')
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Eliminar una recompensa',
    description: 'Elimina una recompensa existente por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la recompensa a eliminar',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recompensa eliminada exitosamente',
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
  async deleteReward(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
