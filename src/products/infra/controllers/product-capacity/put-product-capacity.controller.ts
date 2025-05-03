import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common'
import {
  UPDATE_PRODUCT_CAPACITY_SERVICE,
  type IUpdateProductCapacityService,
} from '@products/domain/services/product-capacity/IUpdateProductCapacityService'
import { UpdateProductCapacityDto } from '@products/domain/dto/UpdateProductCapacity.dto'

@ApiTags('Capacidades de producto')
@Controller('products/capacities')
export class PutProductCapacityController {
  logger = new Logger(PutProductCapacityController.name)

  constructor(
    @Inject(UPDATE_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IUpdateProductCapacityService,
  ) {}

  @ApiOperation({
    summary: 'Actualizar una capacidad de producto',
    description:
      'Actualiza una capacidad de producto existente según el ID proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Capacidad de producto actualizada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Capacidad de producto no encontrada',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la capacidad de producto a actualizar',
    type: Number,
    required: true,
  })
  @ApiBody({
    type: UpdateProductCapacityDto,
    description: 'Datos para actualizar la capacidad de producto',
  })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateProductCapacity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductCapacityDto,
  ) {
    return await this.service.run(id, payload)
  }
}
