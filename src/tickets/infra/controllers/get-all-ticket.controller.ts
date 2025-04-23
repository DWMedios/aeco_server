import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
} from '@nestjs/common'
import {
  FIND_ALL_TICKET_SERVICE,
  type IFindAllTicketService,
} from '@tickets/domain/services/IFindAllTicketService'
import { TicketsFiltersDto } from '@tickets/domain/dto/Filters.dto'

@Controller('tickets')
export class GetAllTicketController {
  logger = new Logger(GetAllTicketController.name)

  constructor(
    @Inject(FIND_ALL_TICKET_SERVICE)
    private readonly service: IFindAllTicketService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTickets(@Query() filters: TicketsFiltersDto) {
    return await this.service.run(filters)
  }
}
