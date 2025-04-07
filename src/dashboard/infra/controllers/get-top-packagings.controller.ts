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
  FIND_TOP_PACKAGINGS_SERVICE,
  type IFindTopPackagingsService,
} from '@dashboard/domain/services/IFindTopPackagingsService'
import { PackgingStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'

@Controller('dashboard')
export class GetTopPackagingsController {
  logger = new Logger(GetTopPackagingsController.name)

  constructor(
    @Inject(FIND_TOP_PACKAGINGS_SERVICE)
    private readonly service: IFindTopPackagingsService,
  ) {}

  @Get('stats/top-packagings')
  @HttpCode(HttpStatus.OK)
  async getTopPackagingsStats(@Query() filters: PackgingStatsFiltersDto) {
    return await this.service.run(filters)
  }
}
