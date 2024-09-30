import { AecoStatus } from '../../infra/entities/Aeco.entity'
import type { IAddress } from './IAddress'
import type { ICompany } from './ICompany'

export interface IAeco {
  name: string
  status: AecoStatus
  isOnline: boolean
  serialNumber: string
  currentCoords?: Record<string, any> | null
  companyId?: number
  addressId?: number
  company?: ICompany | null
  address?: IAddress | null
}
