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

@Controller('products/capacities')
export class PutProductCapacityController {
  logger = new Logger(PutProductCapacityController.name)

  constructor(
    @Inject(UPDATE_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IUpdateProductCapacityService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateProductCapacity(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductCapacityDto,
  ) {
    return await this.service.run(id, payload)
  }
}
