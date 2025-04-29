import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  DELETE_CONTRACTOR_SERVICE,
  type IDeleteContractorService,
} from '@advertisings/domain/services/contractors/IDeleteContractorService'

@Controller('advertisings')
export class DeleteContractorController {
  logger = new Logger(DeleteContractorController.name)

  constructor(
    @Inject(DELETE_CONTRACTOR_SERVICE)
    private readonly service: IDeleteContractorService,
  ) {}

  @Delete('contractors/:id')
  @HttpCode(HttpStatus.OK)
  async deleteContractor(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
