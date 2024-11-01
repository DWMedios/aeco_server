import type { IBase } from './IBase'
import type { IPage } from './IPage'
import type { IAddress } from './IAddress'
import type { ICompany } from './ICompany'
import type { IRewardCategory } from './IRewardCategory'
import type { ITicket } from './ITicket'
import { AecoStatus } from '../../../aecos/domain/enums/AecoStatus.enum'

export interface IAeco extends IBase {
  name: string
  status: AecoStatus
  isOnline: boolean
  initialSetup: boolean
  needsUpdate: boolean
  serialNumber: string
  currentCoords?: Record<string, any> | null
  companyId?: number
  addressId?: number
  company?: ICompany | null
  address?: IAddress | null
  tickets?: ITicket[] | null
  pages?: IPage[] | null
  rewardCategories?: IRewardCategory[] | null
  metadata?: Record<string, any>[]
}
