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
} from '@nestjs/common'
import {
  UPDATE_CONTRACTOR_SERVICE,
  type IUpdateContractorService,
} from '@advertisings/domain/services/contractors/IUpdateContractorService'
import { UpdateContractorDto } from '@advertisings/domain/dto/contractors/UpdateContractor.dto'

@Controller('advertisings')
export class PutContractorController {
  logger = new Logger(PutContractorController.name)

  constructor(
    @Inject(UPDATE_CONTRACTOR_SERVICE)
    private readonly service: IUpdateContractorService,
  ) {}

  @Put('contractors/:id')
  @HttpCode(HttpStatus.OK)
  async updateContractor(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateContractorDto,
  ) {
    return await this.service.run(id, payload)
  }
}
