import type { IBase } from './IBase'
import type { IPage } from './IPage'
import type { ICompany } from './ICompany'
import type { ITicket } from './ITicket'
import type { AecoStatusEnum } from '../enums/AecoStatus.enum'
import type { IAecoCoords } from '../Types'
import type { IReward } from './IReward'

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
  company?: ICompany
  tickets?: ITicket[]
  pages?: IPage[]
  rewards?: IReward[]
}
