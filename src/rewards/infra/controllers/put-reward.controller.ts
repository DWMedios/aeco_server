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
  UseGuards,
} from '@nestjs/common'
import {
  UPDATE_REWARD_SERVICE,
  type IUpdateRewardService,
} from '@rewards/domain/services/IUpdateRewardService'
import { UpdateRewardDto } from '@rewards/domain/dto/UpdateReward.dto'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@Controller('rewards')
export class PutRewardController {
  logger = new Logger(PutRewardController.name)

  constructor(
    @Inject(UPDATE_REWARD_SERVICE)
    private readonly service: IUpdateRewardService,
  ) {}

  @Put(':id')
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  async updateReward(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateRewardDto,
  ) {
    return await this.service.run(id, payload)
  }
}
