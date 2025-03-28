import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CREATE_REWARD_SERVICE,
  type ICreateRewardService,
} from '@rewards/domain/services/ICreateRewardService'
import { CreateRewardDto } from '@rewards/domain/dto/CreateReward.dto'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@Controller('rewards')
export class PostRewardController {
  logger = new Logger(PostRewardController.name)

  constructor(
    @Inject(CREATE_REWARD_SERVICE)
    private readonly service: ICreateRewardService,
  ) {}

  @Post()
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  async createReward(@Body() payload: CreateRewardDto) {
    return await this.service.run(payload)
  }
}
