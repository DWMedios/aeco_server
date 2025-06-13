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
  FIND_PRODUCT_SERVICE,
  type IFindProductService,
} from '@products/domain/services/products/IFindProductService'
import { GetOneProductQueryFilter } from '@products/domain/dto/GetOneQueryFilter'

@ApiTags('Productos')
@Controller('products')
export class GetProductController {
  logger = new Logger(GetProductController.name)

  constructor(
    @Inject(FIND_PRODUCT_SERVICE)
    private readonly service: IFindProductService,
  ) {}

  @ApiOperation({
    summary: 'Obtener un producto por ID',
    description: 'Devuelve un producto específico según el ID proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producto obtenido exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producto no encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto',
    type: Number,
    required: true,
  })
  @ApiQuery({
    name: 'withCapacity',
    description: 'Incluir información de capacidad del producto',
    type: Boolean,
    required: false,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetOneProductQueryFilter,
  ) {
    return await this.service.run(id, query.withCapacity)
  }
}
