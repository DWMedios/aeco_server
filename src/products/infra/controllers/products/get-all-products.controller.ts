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
  FIND_ALL_PRODUCTS_SERVICE,
  type IFindAllProductsService,
} from '@products/domain/services/products/IFindAllProductService'
import { ProductFiltersDto } from '@products/domain/dto/Filters.dto'

@ApiTags('Productos')
@Controller('products')
export class GetAllProductsController {
  logger = new Logger(GetAllProductsController.name)

  constructor(
    @Inject(FIND_ALL_PRODUCTS_SERVICE)
    private readonly service: IFindAllProductsService,
  ) {}

  @ApiOperation({
    summary: 'Obtener todos los productos',
    description:
      'Devuelve una lista paginada de productos que coinciden con los filtros aplicados',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de productos obtenida exitosamente',
  })
  @ApiQuery({
    name: 'withCapacity',
    required: false,
    type: Boolean,
    description: 'Filtrar productos que tienen capacidad asignada',
  })
  @ApiQuery({
    name: 'code',
    required: false,
    description: 'Filtrar por código del producto',
  })
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Filtrar por nombre del producto',
  })
  @ApiQuery({
    name: 'family',
    required: false,
    description: 'Filtrar por familia del producto',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(@Query() filters: ProductFiltersDto) {
    return await this.service.run(filters)
  }
}
