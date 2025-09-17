import type { EntityManager } from 'typeorm'
import type {
  IDailyStats,
  IPackagingStats,
  IProductStats,
  ITopProductResult,
} from '@common/domain/entities'
import type {
  DailyStatsFiltersDto,
  PackgingStatsFiltersDto,
  PackingsPerDayDto,
  TopStatsFiltersDto,
} from '@dashboard/domain/dto/DasboardFilters.dto'

export const DASHBOARD_REPOSITORY = Symbol('IDashboardRepository')

export interface IDashboardRepository {
  dailyStats(
    filters: DailyStatsFiltersDto,
    manager?: EntityManager,
  ): Promise<IDailyStats>
  topProducts(
    filters: TopStatsFiltersDto,
    manager?: EntityManager,
  ): Promise<ITopProductResult[]>
  topPackagings(
    filters: PackgingStatsFiltersDto,
    manager?: EntityManager,
  ): Promise<IPackagingStats[]>
  totalPackingsPerDay(
    filters: PackingsPerDayDto,
    manager?: EntityManager,
  ): Promise<IDailyStats[]>
  insertDailyStats(
    stats: Partial<IDailyStats>,
    manager?: EntityManager,
  ): Promise<IDailyStats>
  insertPackagingStats(
    stats: Partial<IPackagingStats>[],
    manager?: EntityManager,
  ): Promise<IPackagingStats[]>
  insertProductStats(
    stats: Partial<IProductStats>[],
    manager?: EntityManager,
  ): Promise<IProductStats[]>
  softDeleteDailyStatsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean>
  softDeletePackagingStatsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean>
  softDeleteProductStatsByCompany(
    companyId: number,
    manager?: EntityManager,
  ): Promise<boolean>
}
