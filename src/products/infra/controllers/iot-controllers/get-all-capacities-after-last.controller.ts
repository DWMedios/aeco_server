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
  FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE,
  type IFindAllCapacitiesAfterLastService,
} from '@products/domain/services/iot-services/IFindAllCapacitiesAfterLastService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import type { IProductCapacity } from '@common/domain/entities'
import { FilterIotAfterLastDto } from '@shared/domain/dto/iot-dto/Filters-iot.dto'

@Controller('products/capacities')
export class GetAllProductCapacityAfterLastController {
  logger = new Logger(GetAllProductCapacityAfterLastController.name)

  constructor(
    @Inject(FIND_ALL_CAPACITIES_AFTER_LAST_SERVICE)
    private readonly service: IFindAllCapacitiesAfterLastService,
  ) {}

  @Get('after-last')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  async getAllProductCapacityAfterLast(
    @Query() filters: FilterIotAfterLastDto,
  ): Promise<IProductCapacity[]> {
    return await this.service.run(filters.lastId)
  }
}
