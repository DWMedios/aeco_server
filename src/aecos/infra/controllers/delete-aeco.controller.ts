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
  DELETE_AECO_SERVICE,
  type IDeleteAecoService,
} from '@aecos/domain/services/IDeleteAecoService'

@Controller('aecos')
export class DeleteAecoController {
  logger = new Logger(DeleteAecoController.name)

  constructor(
    @Inject(DELETE_AECO_SERVICE)
    private readonly service: IDeleteAecoService,
  ) {}

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
