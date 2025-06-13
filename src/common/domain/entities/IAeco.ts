import type { IBase } from './IBase'
import type { ICampaign } from './ICampaign'
import type { IPage } from './IPage'
import type { ITicket } from './ITicket'
import type { IReward } from './IReward'
import type { ICompany } from './ICompany'
import type { IDailyStats } from './IDailyStats'
import type { IProductStats } from './IProductStats'
import type { IPackagingStats } from './IPackagingStats'
import type { AecoStatusEnum } from '../enums/AecoStatus.enum'
import type { IAecoRequestHistory } from './IAecoRequestHistory'
import type { IAecoCoords } from '../Types'

export interface IAeco extends IBase {
  readonly folio: string
  readonly name: string
  readonly status: AecoStatusEnum
  readonly isOnline: boolean
  readonly initialSetup: boolean
  readonly needsUpdate: boolean
  readonly serialNumber: string
  currentCoords?: IAecoCoords
  readonly companyId?: number
  readonly lastConnection?: string
  company?: ICompany
  tickets?: ITicket[]
  pages?: IPage[]
  rewards?: IReward[]
  dailyStats?: IDailyStats[]
  productStats?: IProductStats[]
  packagingStats?: IPackagingStats[]
  campaigns?: ICampaign[]
  requestHistory?: IAecoRequestHistory[]
}
