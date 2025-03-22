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
  FIND_REWARD_SERVICE,
  type IFindRewardService,
} from '@rewards/domain/services/IFindRewardService'

@Controller('rewards')
export class GetRewardController {
  logger = new Logger(GetRewardController.name)

  constructor(
    @Inject(FIND_REWARD_SERVICE)
    private readonly service: IFindRewardService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneReward(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
