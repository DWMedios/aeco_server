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
  FIND_CAMPAIGN_BY_DATE_SERVICE,
  type IFindCampaignByDateService,
} from '@advertisings/domain/services/campaigns/IFindCampaignByDateService'
import { FilterCampaignByDateDto } from '@advertisings/domain/dto/Filters.dto'

@Controller('advertisings')
export class GetCampaignByDateController {
  logger = new Logger(GetCampaignByDateController.name)

  constructor(
    @Inject(FIND_CAMPAIGN_BY_DATE_SERVICE)
    private readonly service: IFindCampaignByDateService,
  ) {}

  @Get('campaigns/by-date')
  @HttpCode(HttpStatus.OK)
  async getCampaignsByDate(@Query() filters: FilterCampaignByDateDto) {
    return await this.service.run(filters)
  }
}
