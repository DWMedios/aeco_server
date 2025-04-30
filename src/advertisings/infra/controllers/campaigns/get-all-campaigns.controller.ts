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
  FIND_ALL_CAMPAIGN_SERVICE,
  type IFindAllCampaignService,
} from '@advertisings/domain/services/campaigns/IFindAllCampaignService'
import { CampaignFiltersDto } from '@advertisings/domain/dto/Filters.dto'

@Controller('advertisings')
export class GetAllCampaignsController {
  logger = new Logger(GetAllCampaignsController.name)

  constructor(
    @Inject(FIND_ALL_CAMPAIGN_SERVICE)
    private readonly service: IFindAllCampaignService,
  ) {}

  @Get('campaigns')
  @HttpCode(HttpStatus.OK)
  async getAllCampaigns(@Query() filters: CampaignFiltersDto) {
    return await this.service.run(filters)
  }
}
