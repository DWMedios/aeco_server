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
} from '@nestjs/common'
import {
  UPDATE_CAMPAIGN_SERVICE,
  type IUpdateCampaignService,
} from '@advertisings/domain/services/campaigns/IUpdateCampaignService'
import { UpdateCampaignDto } from '@advertisings/domain/dto/campaigns/UpdateCampaign.dto'

@ApiTags('Campañas')
@Controller('advertisings')
export class PutCampaignController {
  logger = new Logger(PutCampaignController.name)

  constructor(
    @Inject(UPDATE_CAMPAIGN_SERVICE)
    private readonly service: IUpdateCampaignService,
  ) {}

  @Put('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Actualizar una campaña publicitaria existente' })
  @ApiParam({ name: 'id', description: 'ID de la campaña', type: 'number' })
  @ApiBody({
    type: UpdateCampaignDto,
    description: 'Datos para actualizar la campaña',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campaña actualizada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Campaña no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  async updateCampaign(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCampaignDto,
  ) {
    return await this.service.run(id, payload)
  }
}
