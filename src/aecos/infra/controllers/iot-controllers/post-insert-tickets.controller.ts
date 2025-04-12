import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  INSERT_TICKETS_AECO_SERVICE,
  type IInsertTicketsAecoService,
} from '@aecos/domain/services/IInsertTicketsAecoService'
import { AecosGuard } from '@shared/app/guards/aecos.guard'
import { DecodedAeco } from '@shared/domain/Types'
import { CurrentAeco } from '@shared/app/decorators/current-logged.decorator'
import { RequestCreateTicketsDto } from '@aecos/domain/dto/CreateAecoTickets.dto'

@Controller('aecos')
export class PostInsertTicketsController {
  logger = new Logger(PostInsertTicketsController.name)

  constructor(
    @Inject(INSERT_TICKETS_AECO_SERVICE)
    private readonly service: IInsertTicketsAecoService,
  ) {}

  @Post('upload-tickets')
  @UseGuards(AecosGuard)
  @HttpCode(HttpStatus.CREATED)
  async insertTickets(
    @CurrentAeco() aeco: DecodedAeco,
    @Body() payload: RequestCreateTicketsDto,
  ) {
    return await this.service.run(aeco, payload)
  }
}
