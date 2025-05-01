import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common'
import {
  CREATE_ADVERTISING_SERVICE,
  type ICreateAdvertisingService,
} from '@advertisings/domain/services/advertisings/ICreateAdvertisingService'
import { CreateAdvertisingDto } from '@advertisings/domain/dto/advertisings/CreateAdvertising.dto'

@Controller('advertisings')
export class PostAdvertisingController {
  constructor(
    @Inject(CREATE_ADVERTISING_SERVICE)
    private readonly service: ICreateAdvertisingService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAdvertising(@Body() payload: CreateAdvertisingDto) {
    return await this.service.run(payload)
  }
}
