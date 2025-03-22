import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
} from '@nestjs/common'
import {
  FIND_ALL_REWARD_SERVICE,
  type IFindAllRewardService,
} from '@rewards/domain/services/IFindAllRewardService'
import { RewardFiltersDto } from '@shared/domain/dto/Filters.dto'

@Controller('rewards')
export class GetAllRewardController {
  logger = new Logger(GetAllRewardController.name)

  constructor(
    @Inject(FIND_ALL_REWARD_SERVICE)
    private readonly service: IFindAllRewardService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllRewards(@Query() filters: RewardFiltersDto) {
    return await this.service.run(filters)
  }
}
