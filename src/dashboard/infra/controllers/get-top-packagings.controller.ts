import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'
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
  FIND_TOP_PACKAGINGS_SERVICE,
  type IFindTopPackagingsService,
} from '@dashboard/domain/services/IFindTopPackagingsService'
import { PackgingStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import { PackagingStatsResponseDto } from '@dashboard/domain/dto/DashboardResponses.dto'

@ApiTags('Dashboard')
@Controller('dashboard')
export class GetTopPackagingsController {
  logger = new Logger(GetTopPackagingsController.name)

  constructor(
    @Inject(FIND_TOP_PACKAGINGS_SERVICE)
    private readonly service: IFindTopPackagingsService,
  ) {}

  @Get('stats/top-packagings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene los empaques más utilizados' })
  @ApiQuery({
    name: 'companyId',
    type: Number,
    required: false,
    description: 'ID de la compañía para filtrar estadísticas',
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    required: false,
    description:
      'Fecha inicial para filtrar estadísticas (formato: YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    required: false,
    description: 'Fecha final para filtrar estadísticas (formato: YYYY-MM-DD)',
  })
  @ApiOkResponse({
    description:
      'Estadísticas de los empaques más utilizados obtenidas correctamente',
    type: PackagingStatsResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuario no autorizado para acceder a estas estadísticas',
  })
  async getTopPackagingsStats(@Query() filters: PackgingStatsFiltersDto) {
    return await this.service.run(filters)
  }
}
