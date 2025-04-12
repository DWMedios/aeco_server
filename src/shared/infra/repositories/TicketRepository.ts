import type { DeepPartial, EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Ticket } from '@common/infra/entities'
import type { ITicket } from '@common/domain/entities'
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
