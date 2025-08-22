import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TicketItem } from '@common/infra/entities'
import type { ITicketItem } from '@common/domain/entities'
import { TransactionalRepository } from '../base/transactional.repository'
import type { ITicketItemRepository } from '@shared/domain/repositories'

@Injectable()
export class TicketItemRepository
  extends TransactionalRepository<ITicketItem>
  implements ITicketItemRepository
{
  constructor(
    @InjectRepository(TicketItem)
    readonly entityRepository: Repository<ITicketItem>,
  ) {
    super(entityRepository)
  }

  createMany(
    items: Partial<ITicketItem>[],
    manager?: EntityManager,
  ): Promise<ITicketItem[]> {
    const newItems = this.repository(manager).create(items)
    return this.repository(manager).save(newItems)
  }
}
