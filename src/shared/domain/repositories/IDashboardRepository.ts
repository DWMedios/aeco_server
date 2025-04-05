import type { EntityManager } from 'typeorm'
import type {
  IDailyStats,
  IPackagingStats,
  IProductStats,
} from '@common/domain/entities'

export const DASHBOARD_REPOSITORY = Symbol('IDashboardRepository')

export interface IDashboardRepository {
  dailyStats(companyId?: number, manager?: EntityManager): Promise<IDailyStats>
  topProducts(
    limit: number,
    orderBy: 'ASC' | 'DESC',
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IProductStats[]>
  topPackagings(
    limit: number,
    orderBy: 'ASC' | 'DESC',
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IPackagingStats[]>
  totalPackingsPerDay(
    startDate: Date,
    endDate: Date,
    companyId?: number,
    manager?: EntityManager,
  ): Promise<IDailyStats[]>
}
