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
  FIND_TOP_PRODUCTS_SERVICE,
  type IFindTopProductsService,
} from '@dashboard/domain/services/IFindTopProductsService'
import { TopStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'

@Controller('dashboard')
export class GetTopProductsController {
  logger = new Logger(GetTopProductsController.name)

  constructor(
    @Inject(FIND_TOP_PRODUCTS_SERVICE)
    private readonly service: IFindTopProductsService,
  ) {}

  @Get('stats/top-products')
  @HttpCode(HttpStatus.OK)
  async getTopProductsStats(@Query() filters: TopStatsFiltersDto) {
    return await this.service.run(filters)
  }
}
