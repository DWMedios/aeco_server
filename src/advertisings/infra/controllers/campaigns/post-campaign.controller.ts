import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_CAMPAIGN_SERVICE,
  type ICreateCampaignService,
} from '@advertisings/domain/services/campaigns/ICreateCampaignService'
import { CreateCampaignDto } from '@advertisings/domain/dto/campaigns/CreateCampaign.dto'

@ApiTags('Campañas')
@Controller('advertisings')
export class PostCampaignController {
  logger = new Logger(PostCampaignController.name)

  constructor(
    @Inject(CREATE_CAMPAIGN_SERVICE)
    private readonly service: ICreateCampaignService,
  ) {}

  @Post('campaigns')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Crear una nueva campaña publicitaria' })
  @ApiBody({
    type: CreateCampaignDto,
    description: 'Datos para crear la campaña publicitaria',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'La campaña ha sido creada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'No autorizado',
  })
  async createCampaign(@Body() payload: CreateCampaignDto) {
    return await this.service.run(payload)
  }
}
