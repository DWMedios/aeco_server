import type { IBase } from './IBase'
import type { IPage } from './IPage'
import type { IAddress } from './IAddress'
import type { ICompany } from './ICompany'
import type { IRewardCategory } from './IRewardCategory'
import type { ITicket } from './ITicket'
import { AecoStatus } from '../../infra/entities/Aeco.entity'

export interface IAeco extends IBase {
  name: string
  status: AecoStatus
  isOnline: boolean
  serialNumber: string
  currentCoords?: Record<string, any> | null
  companyId?: number
  addressId?: number
  company?: ICompany | null
  address?: IAddress | null
  tickets?: ITicket[] | null
  pages?: IPage[] | null
  rewardCategories?: IRewardCategory[] | null
}
