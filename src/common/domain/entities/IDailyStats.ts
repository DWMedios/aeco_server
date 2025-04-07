import type { ICompany } from './ICompany'

export interface IDailyStats {
  readonly totalTickets: number
  readonly totalBottles: number
  readonly totalCans: number
  readonly companyId?: number
  readonly createdAt?: Date
  company?: ICompany
}
