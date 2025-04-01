import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import {
  FIND_PRODUCT_CAPACITY_SERVICE,
  type IFindProductCapacityService,
} from '@products/domain/services/product-capacity/IFindProductCapacityService'
import { GetOneProductCapacityQueryFilter } from '@products/domain/dto/GetOneQueryFilter'

@Controller('products/capacities')
export class GetProductCapacityController {
  logger = new Logger(GetProductCapacityController.name)

  constructor(
    @Inject(FIND_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IFindProductCapacityService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneProductCapacity(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetOneProductCapacityQueryFilter,
  ) {
    return await this.service.run(id, query.withProducts)
  }
}
