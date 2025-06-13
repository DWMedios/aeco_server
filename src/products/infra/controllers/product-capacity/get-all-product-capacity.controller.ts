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
  FIND_ALL_PRODUCT_CAPACITY_SERVICE,
  type IFindAllProductCapacityService,
} from '@products/domain/services/product-capacity/IFindAllProductCapacityService'
import { ProductCapacityFiltersDto } from '@products/domain/dto/Filters.dto'

@ApiTags('Capacidades de producto')
@Controller('products/capacities')
export class GetAllProductCapacityController {
  logger = new Logger(GetAllProductCapacityController.name)

  constructor(
    @Inject(FIND_ALL_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IFindAllProductCapacityService,
  ) {}

  @ApiOperation({
    summary: 'Obtener todas las capacidades de productos',
    description:
      'Devuelve una lista paginada de capacidades de productos que coinciden con los filtros aplicados',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de capacidades obtenida exitosamente',
  })
  @ApiQuery({
    name: 'packaging',
    required: false,
    description: 'Filtrar por tipo de empaque',
  })
  @ApiQuery({
    name: 'weight',
    required: false,
    description: 'Filtrar por peso',
    type: Number,
  })
  @ApiQuery({
    name: 'factor',
    required: false,
    description: 'Filtrar por factor',
    type: Number,
  })
  @ApiQuery({
    name: 'description',
    required: false,
    description: 'Filtrar por descripción',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProductCapacity(@Query() filters: ProductCapacityFiltersDto) {
    return await this.service.run(filters)
  }
}
