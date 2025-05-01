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
  FIND_ALL_ADVERTISING_SERVICE,
  type IFindAllAdvertisingService,
} from '@advertisings/domain/services/advertisings/IFindAllAdvertisingService'
import { FilterAdvertisingDto } from '@advertisings/domain/dto/Filters.dto'

@Controller('advertisings')
export class GetAllAdvertisingController {
  logger = new Logger(GetAllAdvertisingController.name)

  constructor(
    @Inject(FIND_ALL_ADVERTISING_SERVICE)
    private readonly service: IFindAllAdvertisingService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllAdvertising(@Query() filters: FilterAdvertisingDto) {
    return await this.service.run(filters)
  }
}
