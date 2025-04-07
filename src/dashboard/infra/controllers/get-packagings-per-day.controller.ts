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
  FIND_PACKAGINGS_PER_DAY_SERVICE,
  IFindPackagingsPerDayService,
} from '@dashboard/domain/services/IFindPackagingsPerDayService'
import { PackingsPerDayDto } from '@dashboard/domain/dto/DasboardFilters.dto'

@Controller('dashboard')
export class GetPackagingsPerDayController {
  logger = new Logger(GetPackagingsPerDayController.name)

  constructor(
    @Inject(FIND_PACKAGINGS_PER_DAY_SERVICE)
    private readonly service: IFindPackagingsPerDayService,
  ) {}

  @Get('stats/packagings-per-day')
  @HttpCode(HttpStatus.OK)
  async getPackagingsPerDayStats(@Query() filters: PackingsPerDayDto) {
    return await this.service.run(filters)
  }
}
