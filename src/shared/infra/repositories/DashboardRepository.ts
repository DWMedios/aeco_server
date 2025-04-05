import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type {
  IDailyStats,
  IPackagingStats,
  IProductStats,
} from '@common/domain/entities'
import {
  DailyStats,
  PackagingStats,
  ProductStats,
} from '@common/infra/entities'
import type { IDashboardRepository } from '@shared/domain/repositories'
import { TransactionalMultipleRepository } from '../base/transactionalMultiple.repository'

@Injectable()
export class DashboardRepository
  extends TransactionalMultipleRepository<{
    daily: Repository<IDailyStats>
    packaging: Repository<IPackagingStats>
    product: Repository<IProductStats>
  }>
  implements IDashboardRepository
{
  constructor(
    @InjectRepository(DailyStats)
    readonly dailyRepository: Repository<IDailyStats>,
    @InjectRepository(PackagingStats)
    readonly packagingRepository: Repository<IPackagingStats>,
    @InjectRepository(ProductStats)
    readonly productRepository: Repository<IProductStats>,
  ) {
    super({
      daily: dailyRepository,
      packaging: packagingRepository,
      product: productRepository,
    })
  }

  dailyStats(
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IDailyStats> {
    const qb = this.repository('daily', manager)
      .createQueryBuilder('dailyStats')
      .select([
        'SUM(dailyStats.totalTickets) AS totalTickets',
        'SUM(dailyStats.totalBottles) AS totalBottles',
        'SUM(dailyStats.totalCans) AS totalCans',
      ])

    if (companyId) {
      qb.where('dailyStats.companyId = :companyId', { companyId })
    }

    return qb.groupBy('dailyStats.id').getRawOne()
  }

  topProducts(
    limit: number,
    orderBy: 'ASC' | 'DESC' = 'DESC',
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IProductStats[]> {
    const qb = this.repository('product', manager)
      .createQueryBuilder('productStats')
      .leftJoinAndSelect('productStats.product', 'product')
      .select([
        'productStats.id',
        'productStats.totalCount',
        'product.id',
        'product.name',
      ])

    if (companyId) {
      qb.where('productStats.companyId = :companyId', { companyId })
    }

    return qb.orderBy('product.totalCount', orderBy).limit(limit).getMany()
  }

  topPackagings(
    limit: number,
    orderBy: 'ASC' | 'DESC' = 'DESC',
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IPackagingStats[]> {
    const qb = this.repository('packaging', manager)
      .createQueryBuilder('packagingStats')
      .select([
        'packagingStats.id',
        'packagingStats.packagingType',
        'packagingStats.totalCount',
      ])

    if (companyId) {
      qb.where('packagingStats.companyId = :companyId', { companyId })
    }

    return qb.orderBy('packaging.totalCount', orderBy).limit(limit).getMany()
  }

  totalPackingsPerDay(
    startDate: Date,
    endDate: Date,
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IDailyStats[]> {
    const qb = this.repository('daily', manager)
      .createQueryBuilder('dailyStats')
      .where(
        `dailyStats.createdAt >= date_trunc('day', CAST(:start_date AS TIMESTAMP WITH TIME ZONE))`,
        { start_date: startDate },
      )
      .andWhere(
        `dailyStats.createdAt < date_trunc('day', CAST(:end_date AS TIMESTAMP WITH TIME ZONE)) + INTERVAL '1 day'`,
        { end_date: endDate },
      )

    if (companyId) {
      qb.andWhere('dailyStats.companyId = :companyId', {
        companyId,
      })
    }

    return qb.getMany()
  }
}
