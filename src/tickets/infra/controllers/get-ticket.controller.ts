import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import {
  FIND_TICKET_SERVICE,
  type IFindTicketService,
} from '@tickets/domain/services/IFindTicketService'

@Controller('tickets')
export class GetTicketController {
  logger = new Logger(GetTicketController.name)

  constructor(
    @Inject(FIND_TICKET_SERVICE)
    private readonly service: IFindTicketService,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOneTicket(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
