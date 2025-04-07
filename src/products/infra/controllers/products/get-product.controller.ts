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
  FIND_PRODUCT_SERVICE,
  type IFindProductService,
} from '@products/domain/services/products/IFindProductService'
import { GetOneProductQueryFilter } from '@products/domain/dto/GetOneQueryFilter'

@Controller('products')
export class GetProductController {
  logger = new Logger(GetProductController.name)

  constructor(
    @Inject(FIND_PRODUCT_SERVICE)
    private readonly service: IFindProductService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneProduct(
    @Param('id', ParseIntPipe) id: number,
    @Query() query: GetOneProductQueryFilter,
  ) {
    return await this.service.run(id, query.withCapacity)
  }
}
