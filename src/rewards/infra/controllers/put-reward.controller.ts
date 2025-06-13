import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
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
  UPDATE_REWARD_SERVICE,
  type IUpdateRewardService,
} from '@rewards/domain/services/IUpdateRewardService'
import { UpdateRewardDto } from '@rewards/domain/dto/UpdateReward.dto'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@ApiTags('Recompensas')
@Controller('rewards')
export class PutRewardController {
  logger = new Logger(PutRewardController.name)

  constructor(
    @Inject(UPDATE_REWARD_SERVICE)
    private readonly service: IUpdateRewardService,
  ) {}

  @Put(':id')
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Actualizar una recompensa',
    description: 'Actualiza una recompensa existente por su ID',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la recompensa a actualizar',
    type: Number,
  })
  @ApiBody({
    type: UpdateRewardDto,
    description: 'Datos para actualizar la recompensa',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Recompensa actualizada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Recompensa no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Acceso prohibido, requiere permisos',
  })
  async updateReward(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRewardDto,
  ) {
    return await this.service.run(id, payload)
  }
}
