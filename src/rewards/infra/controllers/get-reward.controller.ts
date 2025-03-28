import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_REWARD_SERVICE,
  type IFindRewardService,
} from '@rewards/domain/services/IFindRewardService'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@Controller('rewards')
export class GetRewardController {
  logger = new Logger(GetRewardController.name)

  constructor(
    @Inject(FIND_REWARD_SERVICE)
    private readonly service: IFindRewardService,
  ) {}

  @Get(':id')
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  async getOneReward(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
