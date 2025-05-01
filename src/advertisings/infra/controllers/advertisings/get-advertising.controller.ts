import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  FIND_ADVERTISING_SERVICE,
  type IFindAdvertisingService,
} from '@advertisings/domain/services/advertisings/IFindAdvertisingService'

@Controller('advertisings')
export class GetAdvertisingController {
  logger = new Logger(GetAdvertisingController.name)

  constructor(
    @Inject(FIND_ADVERTISING_SERVICE)
    private readonly service: IFindAdvertisingService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAdvertising(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
