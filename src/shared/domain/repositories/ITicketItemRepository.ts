import type { EntityManager } from 'typeorm'
import type { ITicketItem } from '@common/domain/entities'

export const TICKET_ITEM_REPOSITORY = Symbol('ITicketItemRepository')

export interface ITicketItemRepository {
  createMany(
    items: Partial<ITicketItem>[],
    manager?: EntityManager,
  ): Promise<ITicketItem[]>
}
