import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  DELETE_REWARD_SERVICE,
  type IDeleteRewardService,
} from '@rewards/domain/services/IDeleteRewardService'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@Controller('rewards')
export class DeleteRewardController {
  logger = new Logger(DeleteRewardController.name)

  constructor(
    @Inject(DELETE_REWARD_SERVICE)
    private readonly service: IDeleteRewardService,
  ) {}

  @Delete(':id')
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  async deleteReward(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
