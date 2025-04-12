import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  INSERT_DAILY_STATS_AECO_SERVICE,
  type IInsertDailyStatsAecoService,
} from '@aecos/domain/services/IInsertDailyStatsAecoService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import { CreateDailyStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'

@Controller('aecos')
export class PostInsertDailyStatsController {
  logger = new Logger(PostInsertDailyStatsController.name)

  constructor(
    @Inject(INSERT_DAILY_STATS_AECO_SERVICE)
    private readonly service: IInsertDailyStatsAecoService,
  ) {}

  @Post('upload-daily-stats')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.CREATED)
  async insertDailyStats(
    @CurrentAeco() aeco: DecodedAeco,
    @Body() payload: CreateDailyStatsDto,
  ) {
    return await this.service.run(aeco, payload)
  }
}
