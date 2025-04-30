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
  FIND_ALL_CONTRACTOR_SERVICE,
  type IFindAllContractorService,
} from '@advertisings/domain/services/contractors/IFindAllContractorService'
import { ContractorFiltersDto } from '@advertisings/domain/dto/Filters.dto'

@Controller('advertisings')
export class GetAllContractorsController {
  logger = new Logger(GetAllContractorsController.name)

  constructor(
    @Inject(FIND_ALL_CONTRACTOR_SERVICE)
    private readonly service: IFindAllContractorService,
  ) {}

  @Get('contractors')
  @HttpCode(HttpStatus.OK)
  async getAllContractors(@Query() filters: ContractorFiltersDto) {
    return await this.service.run(filters)
  }
}
