import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Reward } from '@infra-entities'
import type { IReward } from '@domain-entities'
import type { IRewardRepository } from '@domain-repositories'
import type { CreateRewardDto } from '../../../rewards/domain/dto/RewardDto'

export class RewardRepository implements IRewardRepository {
  constructor(
    @InjectRepository(Reward)
    private readonly repository: Repository<IReward>,
  ) {}

  async exists(filter: { id?: number; name?: string }): Promise<boolean> {
    if (!filter) return false

    const whereClause: { id?: number; name?: string } = {}

    if (filter.id) whereClause.id = filter.id
    if (filter.name) whereClause.name = filter.name

    return this.repository.exists({ where: whereClause })
  }

  async create(createReward: CreateRewardDto): Promise<IReward> {
    const qb = await this.repository
      .createQueryBuilder('reward')
      .insert()
      .values(createReward)
      .returning('*')
      .execute()
    return qb.raw[0]
  }
}
