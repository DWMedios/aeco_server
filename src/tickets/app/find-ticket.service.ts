import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  TICKET_REPOSITORY,
  type ITicketRepository,
} from '@shared/domain/repositories/ITicketRepository'
import type { ITicket } from '@common/domain/entities'
import type { IFindTicketService } from '@tickets/domain/services/IFindTicketService'

@Injectable()
export class FindTicketService implements IFindTicketService {
  logger = new Logger(FindTicketService.name)

  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async run(id: number): Promise<ITicket> {
    const ticket = await this.ticketRepository.findById(id)

    if (!ticket) throw new NotFoundException('El ticket no existe')

    return ticket
  }
}
