import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
} from '@nestjs/common'
import {
  FIND_ALL_PRODUCTS_SERVICE,
  type IFindAllProductsService,
} from '@products/domain/services/products/IFindAllProductService'
import { ProductFiltersDto } from '@shared/domain/dto/Filters.dto'

@Controller('products')
export class GetAllProductsController {
  logger = new Logger(GetAllProductsController.name)

  constructor(
    @Inject(FIND_ALL_PRODUCTS_SERVICE)
    private readonly service: IFindAllProductsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(@Query() filters: ProductFiltersDto) {
    return await this.service.run(filters)
  }
}
