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
  UPDATE_ADVERTISING_SERVICE,
  type IUpdateAdvertisingService,
} from '@advertisings/domain/services/advertisings/IUpdateAdvertisingService'
import { UpdateAdvertisingDto } from '@advertisings/domain/dto/advertisings/UpdateAdvertising.dto'

@Controller('advertisings')
export class PutAdvertisingController {
  logger = new Logger(PutAdvertisingController.name)

  constructor(
    @Inject(UPDATE_ADVERTISING_SERVICE)
    private readonly service: IUpdateAdvertisingService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAdvertising(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAdvertisingDto,
  ) {
    return await this.service.run(id, payload)
  }
}
