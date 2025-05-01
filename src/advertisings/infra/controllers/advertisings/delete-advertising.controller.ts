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
  DELETE_ADVERTISING_SERVICE,
  type IDeleteAdvertisingService,
} from '@advertisings/domain/services/advertisings/IDeleteAdvertisingService'

@Controller('advertisings')
export class DeleteAdvertisingController {
  logger = new Logger(DeleteAdvertisingController.name)

  constructor(
    @Inject(DELETE_ADVERTISING_SERVICE)
    private readonly service: IDeleteAdvertisingService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteAdvertising(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
