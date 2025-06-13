import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  DELETE_PRODUCT_CAPACITY_SERVICE,
  type IDeleteProductCapacityService,
} from '@products/domain/services/product-capacity/IDeleteProductCapacityService'

@ApiTags('Capacidades de producto')
@Controller('products/capacities')
export class DeleteProductCapacityController {
  logger = new Logger(DeleteProductCapacityController.name)

  constructor(
    @Inject(DELETE_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IDeleteProductCapacityService,
  ) {}

  @ApiOperation({
    summary: 'Eliminar una capacidad de producto',
    description:
      'Elimina una capacidad de producto existente según el ID proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Capacidad de producto eliminada exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Capacidad de producto no encontrada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID de la capacidad de producto a eliminar',
    type: Number,
    required: true,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProductCapacity(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
