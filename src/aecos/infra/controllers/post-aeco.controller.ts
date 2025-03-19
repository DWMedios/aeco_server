import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
} from '@nestjs/common'
import {
  CREATE_AECO_SERVICE,
  type ICreateAecoService,
} from '@aecos/domain/services/ICreateAecoService'
import { CreateAecoDto } from '@aecos/domain/dto/CreateAeco.dto'

@Controller('aecos')
export class PostAecoController {
  logger = new Logger(PostAecoController.name)

  constructor(
    @Inject(CREATE_AECO_SERVICE)
    private readonly service: ICreateAecoService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createAeco(@Body() payload: CreateAecoDto) {
    return await this.service.run(payload)
  }
}
