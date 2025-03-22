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
  FIND_ALL_AECO_SERVICE,
  type IFindAllAecoService,
} from '@aecos/domain/services/IFindAllAecoService'
import { AecoFiltersDto } from '@shared/domain/dto/Filters.dto'

@Controller('aecos')
export class GetAllAecoController {
  logger = new Logger(GetAllAecoController.name)

  constructor(
    @Inject(FIND_ALL_AECO_SERVICE)
    private readonly service: IFindAllAecoService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getOneUser(@Query() filters: AecoFiltersDto) {
    return await this.service.run(filters)
  }
}
