import type { ITicket } from '@common/domain/entities'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { TicketsFiltersDto } from '../dto/Filters.dto'

export const FIND_ALL_TICKET_SERVICE = Symbol('IFindAllTicketService')

export interface IFindAllTicketService {
  run(filters: TicketsFiltersDto): Promise<PageMetaDto<ITicket>>
}
