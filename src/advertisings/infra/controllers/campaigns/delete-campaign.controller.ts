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
} from '@nestjs/common'
import {
  DELETE_CAMPAIGN_SERVICE,
  type IDeleteCampaignService,
} from '@advertisings/domain/services/campaigns/IDeleteCampaignService'

@ApiTags('Campañas')
@Controller('advertisings')
export class DeleteCampaignController {
  logger = new Logger(DeleteCampaignController.name)

  constructor(
    @Inject(DELETE_CAMPAIGN_SERVICE)
    private readonly service: IDeleteCampaignService,
  ) {}

  @Delete('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Eliminar una campaña publicitaria' })
  @ApiParam({
    name: 'id',
    description: 'ID de la campaña a eliminar',
    type: 'number',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campaña eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Campaña no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'ID de campaña inválido',
  })
  async deleteCampaign(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
