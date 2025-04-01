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

@Controller('products')
export class DeleteProductController {
  logger = new Logger(DeleteProductController.name)

  constructor(
    @Inject(DELETE_PRODUCT_SERVICE)
    private readonly service: IDeleteProductService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
