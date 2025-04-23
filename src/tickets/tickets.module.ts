import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { FIND_ALL_TICKET_SERVICE } from './domain/services/IFindAllTicketService'
import { FindAllTicketService } from './app/find-all-ticket.service'
import { GetAllTicketController } from './infra/controllers/get-all-ticket.controller'
import { FIND_TICKET_SERVICE } from './domain/services/IFindTicketService'
import { FindTicketService } from './app/find-ticket.service'
import { GetTicketController } from './infra/controllers/get-ticket.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: FIND_ALL_TICKET_SERVICE,
      useClass: FindAllTicketService,
    },
    {
      provide: FIND_TICKET_SERVICE,
      useClass: FindTicketService,
    },
  ],
  controllers: [GetAllTicketController, GetTicketController],
})
export class TicketsModule {}
