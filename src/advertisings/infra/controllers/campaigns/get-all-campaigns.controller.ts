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
  FIND_ALL_CAMPAIGN_SERVICE,
  type IFindAllCampaignService,
} from '@advertisings/domain/services/campaigns/IFindAllCampaignService'
import { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'

@ApiTags('Campañas')
@Controller('advertisings')
export class GetAllCampaignsController {
  logger = new Logger(GetAllCampaignsController.name)

  constructor(
    @Inject(FIND_ALL_CAMPAIGN_SERVICE)
    private readonly service: IFindAllCampaignService,
  ) {}

  @Get('campaigns')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtener listado de campañas publicitarias' })
  @ApiQuery({
    name: 'contractName',
    required: false,
    description: 'Filtrar por nombre de contrato',
    type: String,
  })
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Filtrar por descripción',
    type: String,
  })
  @ApiQuery({
    name: 'companyName',
    required: false,
    description: 'Filtrar por nombre de compañía',
    type: String,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    description: 'Filtrar por fecha de inicio',
    type: String,
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    description: 'Filtrar por fecha de fin',
    type: String,
  })
  @ApiQuery({
    name: 'isEnabled',
    required: false,
    description: 'Filtrar por estado activo/inactivo',
    type: Boolean,
  })
  @ApiQuery({
    name: 'contractorId',
    required: false,
    description: 'Filtrar por ID de contratista',
    type: Number,
  })
  @ApiQuery({
    name: 'orderByField',
    required: false,
    description: 'Campo por el cual ordenar',
    enum: [
      'createdAt',
      'contractName',
      'startDate',
      'endDate',
      'contractorId',
      'id',
    ],
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Número de página',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Límite de resultados por página',
    type: Number,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de campañas recuperada exitosamente',
  })
  async getAllCampaigns(@Query() filters: CampaignFiltersDto) {
    return await this.service.run(filters)
  }
}
