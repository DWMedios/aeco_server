import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Reward } from '../../../common/infra/entities/Reward.entity'
import type { IReward } from '../../../common/domain/entities/IReward'
import type { CreateRewardDto } from '../../../rewards/domain/dto/RewardDto'
import type { IRewardRepository } from '../../domain/repositories/IRewardRepository'

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
