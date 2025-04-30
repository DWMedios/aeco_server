import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common'
import {
  UPDATE_CAMPAIGN_SERVICE,
  type IUpdateCampaignService,
} from '@advertisings/domain/services/campaigns/IUpdateCampaignService'
import { UpdateCampaignDto } from '@advertisings/domain/dto/campaigns/UpdateCampaign.dto'

@Controller('advertisings')
export class PutCampaignController {
  logger = new Logger(PutCampaignController.name)

  constructor(
    @Inject(UPDATE_CAMPAIGN_SERVICE)
    private readonly service: IUpdateCampaignService,
  ) {}

  @Put('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  async updateCampaign(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCampaignDto,
  ) {
    return await this.service.run(id, payload)
  }
}
