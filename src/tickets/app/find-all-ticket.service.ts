import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  TICKET_REPOSITORY,
  type ITicketRepository,
} from '@shared/domain/repositories/ITicketRepository'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { ITicket } from '@common/domain/entities'
import type { TicketsFiltersDto } from '@tickets/domain/dto/Filters.dto'
import type { IFindAllTicketService } from '@tickets/domain/services/IFindAllTicketService'

@Injectable()
export class FindAllTicketService implements IFindAllTicketService {
  logger = new Logger(FindAllTicketService.name)

  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async run(filters: TicketsFiltersDto): Promise<PageMetaDto<ITicket>> {
    try {
      const [entities, total] = await this.ticketRepository.findAll(filters)

      return new PageMetaDto<ITicket>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener los tickets')
    }
  }
}
