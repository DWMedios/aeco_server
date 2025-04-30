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
  FIND_CONTRACTOR_SERVICE,
  type IFindContractorService,
} from '@advertisings/domain/services/contractors/IFindContractorService'

@Controller('advertisings')
export class GetContractorController {
  logger = new Logger(GetContractorController.name)

  constructor(
    @Inject(FIND_CONTRACTOR_SERVICE)
    private readonly service: IFindContractorService,
  ) {}

  @Get('contractors/:id')
  @HttpCode(HttpStatus.OK)
  async getOneContractor(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
