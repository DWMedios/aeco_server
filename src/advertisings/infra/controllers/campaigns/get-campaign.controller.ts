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
  FIND_CAMPAIGN_SERVICE,
  type IFindCampaignService,
} from '@advertisings/domain/services/campaigns/IFindCampaignService'

@Controller('advertisings')
export class GetCampaignController {
  logger = new Logger(GetCampaignController.name)

  constructor(
    @Inject(FIND_CAMPAIGN_SERVICE)
    private readonly service: IFindCampaignService,
  ) {}

  @Get('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  async getCampaign(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
