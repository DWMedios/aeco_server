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
  FIND_AECO_SERVICE,
  type IFindAecoService,
} from '@aecos/domain/services/IFindAecoService'

@Controller('aecos')
export class GetAecoController {
  logger = new Logger(GetAecoController.name)

  constructor(
    @Inject(FIND_AECO_SERVICE)
    private readonly service: IFindAecoService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneAeco(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
