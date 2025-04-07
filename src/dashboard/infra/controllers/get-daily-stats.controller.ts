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
  FIND_DAILY_STATS_SERVICE,
  type IFindDailyStatsService,
} from '@dashboard/domain/services/IFindDailyStatsService'
import { DailyStatsFiltersDto } from '@dashboard/domain/dto/DasboardFilters.dto'

@Controller('dashboard')
export class GetDailyStatsController {
  logger = new Logger(GetDailyStatsController.name)

  constructor(
    @Inject(FIND_DAILY_STATS_SERVICE)
    private readonly service: IFindDailyStatsService,
  ) {}

  @Get('stats/daily')
  @HttpCode(HttpStatus.OK)
  async getDailyStats(@Query() filters: DailyStatsFiltersDto) {
    return await this.service.run(filters)
  }
}
