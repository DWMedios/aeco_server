import type { EntityManager, Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import type {
  IDailyStats,
  IPackagingStats,
  IProductStats,
  ITopProductResult,
} from '@common/domain/entities'
import {
  DailyStats,
  PackagingStats,
  ProductStats,
} from '@common/infra/entities'
import type {
  DailyStatsFiltersDto,
  PackgingStatsFiltersDto,
  PackingsPerDayDto,
  TopStatsFiltersDto,
} from '@dashboard/domain/dto/DasboardFilters.dto'
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
    filters: DailyStatsFiltersDto,
    manager?: EntityManager,
  ): Promise<IDailyStats> {
    const qb = this.repository('daily', manager)
      .createQueryBuilder('dailyStats')
      .select([
        'SUM(dailyStats.totalTickets)::int AS "totalTickets"',
        'SUM(dailyStats.totalBottles)::int AS "totalBottles"',
        'SUM(dailyStats.totalCans)::int AS "totalCans"',
      ])

    if (filters?.companyId) {
      qb.where('dailyStats.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    if (filters?.startDate && filters?.endDate) {
      qb.andWhere(
        `dailyStats.createdAt >= date_trunc('day', CAST(:start_date AS TIMESTAMP WITH TIME ZONE))`,
        { start_date: filters.startDate },
      ).andWhere(
        `dailyStats.createdAt < date_trunc('day', CAST(:end_date AS TIMESTAMP WITH TIME ZONE)) + INTERVAL '1 day'`,
        { end_date: filters.endDate },
      )
    }

    return qb.getRawOne()
  }

  topProducts(
    filters: TopStatsFiltersDto,
    manager?: EntityManager,
  ): Promise<ITopProductResult[]> {
    const qb = this.repository('product', manager)
      .createQueryBuilder('productStats')
      .leftJoinAndSelect('productStats.product', 'product')
      .select([
        'product.id AS "productId"',
        'product.name AS "productName"',
        'SUM(productStats.totalCount)::int AS "totalCount"',
      ])

    if (filters?.companyId) {
      qb.where('productStats.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    return qb
      .groupBy('product.id, productStats.totalCount')
      .orderBy('"totalCount"', filters.orderByDirection)
      .limit(filters.limit)
      .getRawMany()
  }

  topPackagings(
    filters: PackgingStatsFiltersDto,
    manager?: EntityManager,
  ): Promise<IPackagingStats[]> {
    const qb = this.repository('packaging', manager)
      .createQueryBuilder('packagingStats')
      .select([
        'packagingStats.packagingType AS "packagingType"',
        'SUM(packagingStats.totalCount)::int AS "totalCount"',
      ])

    if (filters?.companyId) {
      qb.where('packagingStats.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    if (filters?.startDate && filters?.endDate) {
      qb.andWhere(
        `packagingStats.createdAt >= date_trunc('day', CAST(:start_date AS TIMESTAMP WITH TIME ZONE))`,
        { start_date: filters.startDate },
      ).andWhere(
        `packagingStats.createdAt < date_trunc('day', CAST(:end_date AS TIMESTAMP WITH TIME ZONE)) + INTERVAL '1 day'`,
        { end_date: filters.endDate },
      )
    }

    return qb
      .groupBy('packagingStats.packagingType')
      .orderBy('"totalCount"', filters.orderByDirection)
      .getRawMany()
  }

  totalPackingsPerDay(
    filters: PackingsPerDayDto,
    manager?: EntityManager,
  ): Promise<IDailyStats[]> {
    const qb = this.repository('daily', manager)
      .createQueryBuilder('dailyStats')
      .select([
        'dailyStats.createdAt AS "createdAt"',
        'SUM(dailyStats.totalTickets)::int AS "totalTickets"',
        'SUM(dailyStats.totalBottles)::int AS "totalBottles"',
        'SUM(dailyStats.totalCans)::int AS "totalCans"',
      ])
      .where(
        `dailyStats.createdAt >= date_trunc('day', CAST(:start_date AS TIMESTAMP WITH TIME ZONE))`,
        { start_date: filters.startDate },
      )
      .andWhere(
        `dailyStats.createdAt < date_trunc('day', CAST(:end_date AS TIMESTAMP WITH TIME ZONE)) + INTERVAL '1 day'`,
        { end_date: filters.endDate },
      )

    if (filters?.companyId) {
      qb.andWhere('dailyStats.companyId = :companyId', {
        companyId: filters.companyId,
      })
    }

    return qb.groupBy('dailyStats.createdAt').getRawMany()
  }

  insertDailyStats(
    stats: Partial<IDailyStats>,
    manager?: EntityManager,
  ): Promise<IDailyStats> {
    const newStats = this.repository('daily', manager).create(stats)
    return this.repository('daily', manager).save(newStats)
  }

  insertPackagingStats(
    stats: Partial<IPackagingStats>[],
    manager?: EntityManager,
  ): Promise<IPackagingStats[]> {
    const newStats = this.repository('packaging', manager).create(stats)
    return this.repository('packaging', manager).save(newStats)
  }

  insertProductStats(
    stats: Partial<IProductStats>[],
    manager?: EntityManager,
  ): Promise<IProductStats[]> {
    const newStats = this.repository('product', manager).create(stats)
    return this.repository('product', manager).save(newStats)
  }

  async softDeleteDailyStatsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const qb = await this.repository('daily', manager)
      .createQueryBuilder()
      .softDelete()
      .where('companyId = :companyId', { companyId })
      .execute()

    return qb.affected !== 0
  }

  async softDeletePackagingStatsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const qb = await this.repository('packaging', manager)
      .createQueryBuilder()
      .softDelete()
      .where('companyId = :companyId', { companyId })
      .execute()

    return qb.affected !== 0
  }

  async softDeleteProductStatsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean> {
    const qb = await this.repository('product', manager)
      .createQueryBuilder()
      .softDelete()
      .where('companyId = :companyId', { companyId })
      .execute()

    return qb.affected !== 0
  }
}
