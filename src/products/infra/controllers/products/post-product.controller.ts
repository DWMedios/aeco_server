import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_PRODUCT_SERVICE,
  type ICreateProductService,
} from '@products/domain/services/products/ICreateProductService'
import { CreateProductDto } from '@products/domain/dto/CreateProduct.dto'

@ApiTags('Productos')
@Controller('products')
export class PostProductController {
  logger = new Logger(PostProductController.name)

  constructor(
    @Inject(CREATE_PRODUCT_SERVICE)
    private readonly service: ICreateProductService,
  ) {}

  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Crea un nuevo producto en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Producto creado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiBody({
    type: CreateProductDto,
    description: 'Datos para la creación del producto',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() payload: CreateProductDto) {
    return await this.service.run(payload)
  }
}
