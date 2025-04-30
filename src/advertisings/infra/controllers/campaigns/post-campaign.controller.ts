import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_CAMPAIGN_SERVICE,
  type ICreateCampaignService,
} from '@advertisings/domain/services/campaigns/ICreateCampaignService'
import { CreateCampaignDto } from '@advertisings/domain/dto/campaigns/CreateCampaign.dto'

@Controller('advertisings')
export class PostCampaignController {
  logger = new Logger(PostCampaignController.name)

  constructor(
    @Inject(CREATE_CAMPAIGN_SERVICE)
    private readonly service: ICreateCampaignService,
  ) {}

  @Post('campaigns')
  @HttpCode(HttpStatus.CREATED)
  async createCampaign(@Body() payload: CreateCampaignDto) {
    return await this.service.run(payload)
  }
}
