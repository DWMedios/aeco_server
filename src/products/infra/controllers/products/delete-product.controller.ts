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
  DELETE_PRODUCT_SERVICE,
  type IDeleteProductService,
} from '@products/domain/services/products/IDeleteProductService'

@ApiTags('Productos')
@Controller('products')
export class DeleteProductController {
  logger = new Logger(DeleteProductController.name)

  constructor(
    @Inject(DELETE_PRODUCT_SERVICE)
    private readonly service: IDeleteProductService,
  ) {}

  @ApiOperation({
    summary: 'Eliminar un producto',
    description: 'Elimina un producto existente según el ID proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producto eliminado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producto no encontrado',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a eliminar',
    type: Number,
    required: true,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
