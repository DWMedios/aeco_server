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
  FIND_PACKAGINGS_PER_DAY_SERVICE,
  IFindPackagingsPerDayService,
} from '@dashboard/domain/services/IFindPackagingsPerDayService'
import { PackingsPerDayDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import { PackagingsPerDayResponseDto } from '@dashboard/domain/dto/DashboardResponses.dto'
import { IDailyStats } from '@common/domain/entities'

@ApiTags('Dashboard')
@Controller('dashboard')
export class GetPackagingsPerDayController {
  logger = new Logger(GetPackagingsPerDayController.name)

  constructor(
    @Inject(FIND_PACKAGINGS_PER_DAY_SERVICE)
    private readonly service: IFindPackagingsPerDayService,
  ) {}

  @Get('stats/packagings-per-day')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene las estadísticas de empaques por día' })
  @ApiQuery({
    name: 'companyId',
    type: Number,
    required: false,
    description: 'ID de la compañía para filtrar estadísticas',
  })
  @ApiQuery({
    name: 'startDate',
    type: String,
    required: true,
    description:
      'Fecha inicial para filtrar estadísticas (formato: YYYY-MM-DD)',
  })
  @ApiQuery({
    name: 'endDate',
    type: String,
    required: true,
    description: 'Fecha final para filtrar estadísticas (formato: YYYY-MM-DD)',
  })
  @ApiOkResponse({
    description: 'Estadísticas de empaques por día obtenidas correctamente',
    type: PackagingsPerDayResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Usuario no autorizado para acceder a estas estadísticas',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Parámetros de consulta inválidos o incompletos',
  })
  async getPackagingsPerDayStats(
    @Query() filters: PackingsPerDayDto,
  ): Promise<IDailyStats[]> {
    return await this.service.run(filters)
  }
}
