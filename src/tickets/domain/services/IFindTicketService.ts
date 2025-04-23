import type { ITicket } from '@common/domain/entities'

export const FIND_TICKET_SERVICE = Symbol('IFindTicketService')

export interface IFindTicketService {
  run(id: number): Promise<ITicket>
}
