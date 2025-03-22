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
  CREATE_REWARD_SERVICE,
  type ICreateRewardService,
} from '@rewards/domain/services/ICreateRewardService'
import { CreateRewardDto } from '@rewards/domain/dto/CreateReward.dto'

@Controller('rewards')
export class PostRewardController {
  logger = new Logger(PostRewardController.name)

  constructor(
    @Inject(CREATE_REWARD_SERVICE)
    private readonly service: ICreateRewardService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReward(@Body() payload: CreateRewardDto) {
    return await this.service.run(payload)
  }
}
