import type { DeepPartial, EntityManager } from 'typeorm'
import type { ITicket } from '@common/domain/entities'

export const TICKET_REPOSITORY = Symbol('ITicketRepository')

export interface ITicketRepository {
  create(
    tickets: DeepPartial<ITicket>[],
    manager?: EntityManager,
  ): Promise<ITicket[]>
  update(
    exists: ITicket,
    ticket: Partial<ITicket>,
    manager?: EntityManager,
  ): Promise<ITicket>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
