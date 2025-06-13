import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  CREATE_REWARD_SERVICE,
  type ICreateRewardService,
} from '@rewards/domain/services/ICreateRewardService'
import { CreateRewardDto } from '@rewards/domain/dto/CreateReward.dto'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@ApiTags('Recompensas')
@Controller('rewards')
export class PostRewardController {
  logger = new Logger(PostRewardController.name)

  constructor(
    @Inject(CREATE_REWARD_SERVICE)
    private readonly service: ICreateRewardService,
  ) {}

  @Post()
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Crear una nueva recompensa',
    description: 'Crea una nueva recompensa en el sistema',
  })
  @ApiBody({
    type: CreateRewardDto,
    description: 'Datos de la recompensa a crear',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La recompensa ha sido creada exitosamente',
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
  async createReward(@Body() payload: CreateRewardDto) {
    return await this.service.run(payload)
  }
}
