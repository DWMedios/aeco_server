import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  UseGuards,
} from '@nestjs/common'
import {
  GET_ALL_AECO_REWARDS_SERVICE,
  type IGetAllAecoRewardsService,
} from '@aecos/domain/services/iot-services/IGetAllAecoRewardsService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import type { IAeco } from '@common/domain/entities'

@Controller('aecos')
export class GetAllAecoRewardsController {
  logger = new Logger(GetAllAecoRewardsController.name)

  constructor(
    @Inject(GET_ALL_AECO_REWARDS_SERVICE)
    private readonly service: IGetAllAecoRewardsService,
  ) {}

  @Get('rewards')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.OK)
  async getAllAecoRewards(@CurrentAeco() aeco: DecodedAeco): Promise<IAeco> {
    return await this.service.run(aeco)
  }
}
