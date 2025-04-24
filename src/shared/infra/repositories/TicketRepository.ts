import type { DeepPartial, EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Ticket } from '@common/infra/entities'
import type { ITicket } from '@common/domain/entities'
import type { TicketsFiltersDto } from '@tickets/domain/dto/Filters.dto'
import type { ITicketRepository } from '@shared/domain/repositories/ITicketRepository'
import { TransactionalRepository } from '../base/transactional.repository'

@Injectable()
export class TicketRepository
  extends TransactionalRepository<ITicket>
  implements ITicketRepository
{
  constructor(
    @InjectRepository(Ticket)
    readonly entityRepository: Repository<ITicket>,
  ) {
    super(entityRepository)
  }

  findById(id: number, manager?: EntityManager): Promise<ITicket | null> {
    const qb = this.repository(manager)
      .createQueryBuilder('ticket')
      .leftJoinAndSelect('ticket.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('ticket.aeco', 'aeco')
      .select([
        'ticket.id',
        'ticket.folio',
        'ticket.method',
        'ticket.summary',
        'ticket.totalCans',
        'ticket.totalBottles',
        'ticket.createdAt',
        'items.id',
        'items.quantity',
        'items.packagingType',
        'product.id',
        'product.name',
        'product.code',
        'product.family',
        'aeco.id',
        'aeco.folio',
        'aeco.name',
      ])
      .where('ticket.id = :id', { id })

    return qb.getOne()
  }

  findAll(
    filters: TicketsFiltersDto,
    manager?: EntityManager,
  ): Promise<[ITicket[], number]> {
    const qb = this.repository(manager)
      .createQueryBuilder('tickets')
      .leftJoinAndSelect('tickets.items', 'items')
      .leftJoinAndSelect('items.product', 'product')
      .leftJoinAndSelect('tickets.aeco', 'aeco')
      .select([
        'tickets.id',
        'tickets.folio',
        'tickets.method',
        'tickets.summary',
        'tickets.totalCans',
        'tickets.totalBottles',
        'tickets.createdAt',
        'items.id',
        'items.quantity',
        'items.packagingType',
        'product.id',
        'product.name',
        'product.code',
        'product.family',
        'aeco.id',
        'aeco.folio',
        'aeco.name',
      ])

    if (filters?.folio) {
      qb.orWhere('LOWER(unaccent(BTRIM(tickets.folio))) LIKE :folio', {
        folio: `%${filters.folio}%`,
      })
    }

    if (filters?.aecoId) {
      qb.orWhere('tickets.aecoId = :aecoId', { aecoId: filters.aecoId })
    }

    if (filters?.productId) {
      qb.orWhere('items.productId = :productId', {
        productId: filters.productId,
      })
    }

    qb.take(filters.perpage).skip((filters.page - 1) * filters.perpage)

    if (filters?.orderByDirection && filters?.orderByField) {
      if (filters.orderByField === 'productId') {
        qb.orderBy('items.productId', filters.orderByDirection)
      } else {
        qb.orderBy(`tickets.${filters.orderByField}`, filters.orderByDirection)
      }
    }

    return qb.getManyAndCount()
  }

  create(
    tickets: DeepPartial<ITicket>[],
    manager?: EntityManager,
  ): Promise<ITicket[]> {
    const newTickets = this.repository(manager).create(tickets)
    return this.repository(manager).save(newTickets)
  }

  update(
    exists: ITicket,
    ticket: Partial<ITicket>,
    manager?: EntityManager,
  ): Promise<ITicket> {
    const updatedTicket = this.repository(manager).merge(exists, ticket)
    return this.repository(manager).save(updatedTicket)
  }

  async delete(id: number, manager?: EntityManager): Promise<boolean> {
    const result = await this.repository(manager)
      .createQueryBuilder('ticket')
      .delete()
      .where('id = :id', { id })
      .execute()

    return result.affected !== 0
  }

  async softDelete(id: number, manager?: EntityManager): Promise<boolean> {
    const result = await this.repository(manager)
      .createQueryBuilder('ticket')
      .softDelete()
      .where('id = :id', { id })
      .execute()

    return result.affected !== 0
  }

  async restore(id: number, manager?: EntityManager): Promise<boolean> {
    const result = await this.repository(manager)
      .createQueryBuilder('ticket')
      .restore()
      .where('id = :id', { id })
      .execute()

    return result.affected !== 0
  }
}
