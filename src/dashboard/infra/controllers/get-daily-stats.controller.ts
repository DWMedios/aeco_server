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
  FIND_DAILY_STATS_SERVICE,
  type IFindDailyStatsService,
} from '@dashboard/domain/services/IFindDailyStatsService'
import { DailyStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import { DailyStatsResponseDto } from '@dashboard/domain/dto/DashboardResponses.dto'
import { IDailyStats } from '@common/domain/entities'

@ApiTags('Dashboard')
@Controller('dashboard')
export class GetDailyStatsController {
  logger = new Logger(GetDailyStatsController.name)

  constructor(
    @Inject(FIND_DAILY_STATS_SERVICE)
    private readonly service: IFindDailyStatsService,
  ) {}

  @Get('stats/daily')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene las estadísticas diarias del dashboard' })
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
    description: 'Estadísticas diarias obtenidas correctamente',
    type: DailyStatsResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuario no autorizado para acceder a estas estadísticas',
  })
  async getDailyStats(
    @Query() filters: DailyStatsFiltersDto,
  ): Promise<IDailyStats> {
    return await this.service.run(filters)
  }
}
