import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  DELETE_CAMPAIGN_SERVICE,
  type IDeleteCampaignService,
} from '@advertisings/domain/services/campaigns/IDeleteCampaignService'

@Controller('advertisings')
export class DeleteCampaignController {
  logger = new Logger(DeleteCampaignController.name)

  constructor(
    @Inject(DELETE_CAMPAIGN_SERVICE)
    private readonly service: IDeleteCampaignService,
  ) {}

  @Delete('campaigns/:id')
  @HttpCode(HttpStatus.OK)
  async deleteCampaign(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
