import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE,
  type IFindAllProductsAfterLastService,
} from '@products/domain/services/iot-services/IFindAllProductsAfterLastService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import type { IProduct } from '@common/domain/entities'
import { FilterIotAfterLastDto } from '@shared/domain/dto/iot-dto/Filters-iot.dto'

@Controller('products')
export class GetAllProductsAfterLastController {
  logger = new Logger(GetAllProductsAfterLastController.name)

  constructor(
    @Inject(FIND_ALL_PRODUCTS_AFTER_LAST_SERVICE)
    private readonly service: IFindAllProductsAfterLastService,
  ) {}

  @Get('after-last')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  async getAllProductsAfterLast(
    @Query() filters: FilterIotAfterLastDto,
  ): Promise<IProduct[]> {
    return await this.service.run(filters.lastId)
  }
}
