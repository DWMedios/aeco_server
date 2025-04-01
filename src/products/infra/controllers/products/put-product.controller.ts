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

@Controller('products')
export class PutProductController {
  logger = new Logger(PutProductController.name)

  constructor(
    @Inject(UPDATE_PRODUCT_SERVICE)
    private readonly service: IUpdateProductService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return await this.service.run(id, payload)
  }
}
