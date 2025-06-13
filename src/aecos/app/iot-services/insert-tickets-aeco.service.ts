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
import {
  AECO_ATTEMPTS_REPOSITORY,
  type IAecoAttemptsRepository,
} from '@shared/domain/repositories'
import type { IAecoAttempts, ITicket } from '@common/domain/entities'
import type { DecodedAeco } from '@shared/domain/Types'
import type { IAecoPayload } from '@aecos/domain/Types'
import { AecoAttemptsEnum } from '@common/domain/enums/AecoAttempts.enum'
import type { RequestCreateTicketsDto } from '@aecos/domain/dto/CreateAecoTickets.dto'
import type { IInsertTicketsAecoService } from '@aecos/domain/services/iot-services/IInsertTicketsAecoService'

@Injectable()
export class InsertTicketsAecoService implements IInsertTicketsAecoService {
  logger = new Logger(InsertTicketsAecoService.name)

  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
    @Inject(AECO_ATTEMPTS_REPOSITORY)
    private readonly aecoAttemptsRepository: IAecoAttemptsRepository,
    @Inject(TRANSACTION_SERVICE)
    private readonly transactionService: TransactionServiceInterface,
  ) {}

  async run(
    currentAeco: DecodedAeco,
    request: RequestCreateTicketsDto,
  ): Promise<{ success: boolean }> {
    const { tickets } = request

    if (!tickets || tickets.length === 0) {
      await this.logAttempt(
        currentAeco.aecoSerialNumber,
        'No hay tickets para insertar',
        currentAeco.requestPayload,
      )
      this.logger.warn('No hay tickets para insertar')
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
          await this.logAttempt(
            currentAeco.aecoSerialNumber,
            'Error al crear los tickets',
            currentAeco.requestPayload,
          )
          this.logger.error('Error al crear los tickets', error.stack)
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

  private async logAttempt(
    serialNumber: string,
    errorMessage: string,
    requestPayload: IAecoPayload,
  ) {
    const data: Partial<IAecoAttempts> = {
      serialNumber,
      ipAddress: requestPayload.ipAddress || 'UNKNOWN',
      reason: AecoAttemptsEnum.SERVICE_ERROR,
      requestData: requestPayload,
      errorMessage,
      geolocation: requestPayload.geolocation || {
        latitude: '0',
        longitude: '0',
      },
    }
    try {
      await this.aecoAttemptsRepository.create(data)
    } catch (error) {
      this.logger.error('Failed to save attempt log', error.stack)
    }
  }
}
