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
  UPDATE_PRODUCT_SERVICE,
  type IUpdateProductService,
} from '@products/domain/services/products/IUpdateProductService'
import { UpdateProductDto } from '@products/domain/dto/UpdateProduct.dto copy'

@ApiTags('Productos')
@Controller('products')
export class PutProductController {
  logger = new Logger(PutProductController.name)

  constructor(
    @Inject(UPDATE_PRODUCT_SERVICE)
    private readonly service: IUpdateProductService,
  ) {}

  @ApiOperation({
    summary: 'Actualizar un producto',
    description: 'Actualiza un producto existente según el ID proporcionado',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Producto actualizado exitosamente',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Producto no encontrado',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Datos de entrada inválidos',
  })
  @ApiParam({
    name: 'id',
    description: 'ID del producto a actualizar',
    type: Number,
    required: true,
  })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Datos para actualizar el producto',
  })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.service.run(id, payload)
  }
}
