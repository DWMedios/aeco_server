import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import {
  FIND_PRODUCT_CAPACITY_SERVICE,
  type IFindProductCapacityService,
} from '@products/domain/services/product-capacity/IFindProductCapacityService'
import { GetOneProductCapacityQueryFilter } from '@products/domain/dto/GetOneQueryFilter'

@ApiTags('Capacidades de producto')
@Controller('products/capacities')
export class GetProductCapacityController {
  logger = new Logger(GetProductCapacityController.name)

  constructor(
    @Inject(FIND_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IFindProductCapacityService,
  ) {}

  @ApiOperation({
    summary: 'Obtener una capacidad de producto por ID',
    description:
      'Devuelve una capacidad de producto específica según el ID proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Capacidad de producto obtenida exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Capacidad de producto no encontrada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la capacidad de producto',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'withProducts',
    description: 'Incluir información de productos asociados a esta capacidad',
    type: Boolean,
    required: false,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneProductCapacity(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetOneProductCapacityQueryFilter,
  ) {
    return await this.service.run(id, query.withProducts)
  }
}
