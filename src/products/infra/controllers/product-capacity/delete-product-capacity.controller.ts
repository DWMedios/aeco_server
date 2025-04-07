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

@Controller('products/capacities')
export class DeleteProductCapacityController {
  logger = new Logger(DeleteProductCapacityController.name)

  constructor(
    @Inject(DELETE_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IDeleteProductCapacityService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProductCapacity(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
