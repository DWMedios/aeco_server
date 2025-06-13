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
  FIND_TOP_PRODUCTS_SERVICE,
  type IFindTopProductsService,
} from '@dashboard/domain/services/IFindTopProductsService'
import { TopStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiOkResponse,
  ApiResponse,
} from '@nestjs/swagger'
import { ProductStatsResponseDto } from '@dashboard/domain/dto/DashboardResponses.dto'
import { IProductStats } from '@common/domain/entities'

@ApiTags('Dashboard')
@Controller('dashboard')
export class GetTopProductsController {
  logger = new Logger(GetTopProductsController.name)

  constructor(
    @Inject(FIND_TOP_PRODUCTS_SERVICE)
    private readonly service: IFindTopProductsService,
  ) {}

  @Get('stats/top-products')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Obtiene los productos más registrados' })
  @ApiQuery({
    name: 'companyId',
    type: Number,
    required: false,
    description: 'ID de la compañía para filtrar estadísticas',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: true,
    description: 'Límite de productos a mostrar en el resultado',
  })
  @ApiQuery({
    name: 'orderByDirection',
    required: true,
    enum: ['ASC', 'DESC'],
    description: 'Dirección de ordenamiento (ASC o DESC)',
  })
  @ApiOkResponse({
    description:
      'Estadísticas de los productos más registrados obtenidas correctamente',
    type: ProductStatsResponseDto,
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
  async getTopProductsStats(
    @Query() filters: TopStatsFiltersDto,
  ): Promise<IProductStats[]> {
    return await this.service.run(filters)
  }
}
