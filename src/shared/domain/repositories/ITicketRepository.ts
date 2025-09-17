import type { DeepPartial, EntityManager } from 'typeorm'
import type { ITicket } from '@common/domain/entities'
import type { TicketsFiltersDto } from '@tickets/domain/dto/Filters.dto'

export const TICKET_REPOSITORY = Symbol('ITicketRepository')

export interface ITicketRepository {
  findById(id: number, manager?: EntityManager): Promise<ITicket | null>
  // This method is only for Anahuac College
  findManyCardCodes(
    startDate?: string,
    endDate?: string,
    manager?: EntityManager,
  ): Promise<ITicket[]>
  findAll(
    filters: TicketsFiltersDto,
    manager?: EntityManager,
  ): Promise<[ITicket[], number]>
  createMany(
    tickets: DeepPartial<ITicket>[],
    manager?: EntityManager,
  ): Promise<ITicket[]>
  partialUpdate(
    exists: ITicket,
    ticket: Partial<ITicket>,
    manager?: EntityManager,
  ): Promise<ITicket>
  delete(id: number, manager?: EntityManager): Promise<boolean>
  softDelete(id: number, manager?: EntityManager): Promise<boolean>
  restore(id: number, manager?: EntityManager): Promise<boolean>
}
