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
  INSERT_PACKAGING_STATS_AECO_SERVICE,
  type IInsertPackagingStatsAecoService,
} from '@aecos/domain/services/IInsertPackagingStatsAecoService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import { RequestPackagingStatsDto } from '@aecos/domain/dto/CreateAecoStats.dto'

@Controller('aecos')
export class PostInsertPackagingStatsController {
  logger = new Logger(PostInsertPackagingStatsController.name)

  constructor(
    @Inject(INSERT_PACKAGING_STATS_AECO_SERVICE)
    private readonly service: IInsertPackagingStatsAecoService,
  ) {}

  @Post('upload-packaging-stats')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.CREATED)
  async insertPackagingStats(
    @CurrentAeco() aeco: DecodedAeco,
    @Body() payload: RequestPackagingStatsDto,
  ) {
    return await this.service.run(aeco, payload)
  }
}
