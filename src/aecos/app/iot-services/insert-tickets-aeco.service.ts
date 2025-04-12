import {
  Injectable,
  Inject,
  Logger,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  TICKET_REPOSITORY,
  type ITicketRepository,
} from '@shared/domain/repositories/ITicketRepository'
import {
  TRANSACTION_SERVICE,
  type TransactionServiceInterface,
} from '@shared/domain/services/transaction-service.interface'
import type { ITicket } from '@common/domain/entities'
import type { DecodedAeco } from '@shared/domain/Types'
import type { RequestCreateTicketsDto } from '@aecos/domain/dto/CreateAecoTickets.dto'
import type { IInsertTicketsAecoService } from '@aecos/domain/services/IInsertTicketsAecoService'

@Injectable()
export class InsertTicketsAecoService implements IInsertTicketsAecoService {
  logger = new Logger(InsertTicketsAecoService.name)

  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: RequestCreateTicketsDto,
  ): Promise<{ success: boolean }> {
    const { tickets } = request

    if (!tickets || tickets.length === 0) {
      throw new BadRequestException('No hay tickets para insertar')
    }

    const mapTickets = tickets.map((ticket) => ({
      ...ticket,
      ...(ticket?.summary && { summary: ticket.summary }),
      aecoId: currentAeco.aecoId,
      items: ticket.items,
    }))

    const ticketTransaction = await this.transactionService.executeTransaction(
      async (manager) => {
        let newTickets: ITicket[] = []
        try {
          newTickets = await this.ticketRepository.create(mapTickets, manager)
        } catch (error) {
          throw new InternalServerErrorException(
            'Error al crear los tickets',
            error,
          )
        }
        return newTickets
      },
    )

    return { success: ticketTransaction.length > 0 ? true : false }
  }
}
