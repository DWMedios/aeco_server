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
  CREATE_CONTRACTOR_SERVICE,
  type ICreateContractorService,
} from '@advertisings/domain/services/contractors/ICreateContractorService'
import { CreateContractorDto } from '@advertisings/domain/dto/contractors/CreateContractor.dto'

@Controller('advertisings')
export class PostContractorController {
  logger = new Logger(PostContractorController.name)

  constructor(
    @Inject(CREATE_CONTRACTOR_SERVICE)
    private readonly service: ICreateContractorService,
  ) {}

  @Post('contractors')
  @HttpCode(HttpStatus.CREATED)
  async createContractor(@Body() payload: CreateContractorDto) {
    return await this.service.run(payload)
  }
}
