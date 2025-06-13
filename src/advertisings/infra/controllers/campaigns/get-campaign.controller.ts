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
} from '@nestjs/common'
import {
  FIND_CAMPAIGN_SERVICE,
  type IFindCampaignService,
} from '@advertisings/domain/services/campaigns/IFindCampaignService'

@ApiTags('Campañas')
@Controller('advertisings')
export class GetCampaignController {
  logger = new Logger(GetCampaignController.name)

  constructor(
    @Inject(FIND_CAMPAIGN_SERVICE)
    private readonly service: IFindCampaignService,
  ) {}

  @Get('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener una campaña publicitaria por su ID' })
  @ApiParam({ name: 'id', description: 'ID de la campaña', type: 'number' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campaña encontrada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Campaña no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID de campaña inválido',
  })
  async getCampaign(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
