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
  UPDATE_AECO_SERVICE,
  type IUpdateAecoService,
} from '@aecos/domain/services/IUpdateAecoService'
import { UpdateAecoDto } from '@aecos/domain/dto/UpdateAecoDto'

@Controller('aecos')
export class PutAecoController {
  logger = new Logger(PutAecoController.name)

  constructor(
    @Inject(UPDATE_AECO_SERVICE)
    private readonly service: IUpdateAecoService,
  ) {}

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateAeco(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAecoDto,
  ) {
    return await this.service.run(id, payload)
  }
}
