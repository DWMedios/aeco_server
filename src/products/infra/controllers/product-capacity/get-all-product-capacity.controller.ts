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
  FIND_ALL_PRODUCT_CAPACITY_SERVICE,
  type IFindAllProductCapacityService,
} from '@products/domain/services/product-capacity/IFindAllProductCapacityService'
import { ProductCapacityFiltersDto } from '@shared/domain/dto/Filters.dto'

@Controller('products/capacities')
export class GetAllProductCapacityController {
  logger = new Logger(GetAllProductCapacityController.name)

  constructor(
    @Inject(FIND_ALL_PRODUCT_CAPACITY_SERVICE)
    private readonly service: IFindAllProductCapacityService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProductCapacity(@Query() filters: ProductCapacityFiltersDto) {
    return await this.service.run(filters)
  }
}
