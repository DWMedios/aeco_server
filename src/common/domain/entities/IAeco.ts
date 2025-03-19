import type { IBase } from './IBase'
import type { IPage } from './IPage'
import type { ICompany } from './ICompany'
import type { IRewardCategory } from './IRewardCategory'
import type { ITicket } from './ITicket'
import type { AecoStatusEnum } from '../enums/AecoStatus.enum'
import type { IAecoCoords } from '../Types'

export interface IAeco extends IBase {
  folio: string
  name: string
  status: AecoStatusEnum
  isOnline: boolean
  initialSetup: boolean
  needsUpdate: boolean
  serialNumber: string
  currentCoords?: IAecoCoords
  companyId?: number
  company?: ICompany
  tickets?: ITicket[]
  pages?: IPage[]
  rewardCategories?: IRewardCategory[]
}
