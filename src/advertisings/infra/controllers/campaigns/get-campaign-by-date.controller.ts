import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
} from '@nestjs/common'
import {
  FIND_CAMPAIGN_BY_DATE_SERVICE,
  type IFindCampaignByDateService,
} from '@advertisings/domain/services/campaigns/IFindCampaignByDateService'
import { FilterCampaignByDateDto } from '@advertisings/domain/dto/Filters.dto'

@ApiTags('Campañas')
@Controller('advertisings')
export class GetCampaignByDateController {
  logger = new Logger(GetCampaignByDateController.name)

  constructor(
    @Inject(FIND_CAMPAIGN_BY_DATE_SERVICE)
    private readonly service: IFindCampaignByDateService,
  ) {}

  @Get('campaigns/by-date')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Filtrar campañas por rango de fechas' })
  @ApiQuery({
    name: 'companyId',
    required: true,
    description: 'ID de la compañía',
    type: Number,
  })
  @ApiQuery({
    name: 'startDate',
    required: true,
    description: 'Fecha de inicio (formato ISO)',
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    description: 'Fecha de fin (formato ISO)',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campañas filtradas por fecha recuperadas exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parámetros de fecha o compañía inválidos',
  })
  async getCampaignsByDate(@Query() filters: FilterCampaignByDateDto) {
    return await this.service.run(filters)
  }
}
