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
  CREATE_PRODUCT_CAPACITY_SERVICE,
  type ICreateProductCapacityService,
} from '@products/domain/services/product-capacity/ICreateProductCapacityService'
import { CreateProductCapacityDto } from '@products/domain/dto/CreateProductCapacity.dto'

@ApiTags('Capacidades de producto')
@Controller('products/capacities')
export class PostProductCapacityController {
  logger = new Logger(PostProductCapacityController.name)

  constructor(
    @Inject(CREATE_PRODUCT_CAPACITY_SERVICE)
    private readonly service: ICreateProductCapacityService,
  ) {}

  @ApiOperation({
    summary: 'Crear una nueva capacidad de producto',
    description: 'Crea una nueva capacidad de producto en el sistema',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Capacidad de producto creada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiBody({
    type: CreateProductCapacityDto,
    description: 'Datos para la creación de la capacidad de producto',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProductCapacity(@Body() payload: CreateProductCapacityDto) {
    return await this.service.run(payload)
  }
}
