import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_ALL_REWARD_SERVICE,
  type IFindAllRewardService,
} from '@rewards/domain/services/IFindAllRewardService'
import { DecodedUser } from '@shared/domain/Types'
import { RewardFiltersDto } from '@shared/domain/dto/Filters.dto'
import { CurrentUser } from '@shared/app/decorators/current-user.decorator'
import { RewardRoleGuard } from '../guards/reward-role.guard'

@Controller('rewards')
export class GetAllRewardController {
  logger = new Logger(GetAllRewardController.name)

  constructor(
    @Inject(FIND_ALL_REWARD_SERVICE)
    private readonly service: IFindAllRewardService,
  ) {}

  @Get()
  @UseGuards(RewardRoleGuard)
  @HttpCode(HttpStatus.OK)
  async getAllRewards(
    @CurrentUser('user') user: DecodedUser,
    @Query() filters: RewardFiltersDto,
  ) {
    return await this.service.run(user, filters)
  }
}
