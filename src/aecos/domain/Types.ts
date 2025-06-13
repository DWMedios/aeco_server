import type { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'
import type { IAecoCoords } from '@common/domain/Types'

export interface IAecoFilterOptions {
  id?: number
  companyId?: number
  folio?: string
  serialNumber?: string
  name?: string
  status?: AecoStatusEnum
}

export interface IAecoFilterManyOptions {
  ids: number[]
  companyNullable?: boolean
  companyId?: number
}

export interface IAecoRequestData {
  method: string
  url: string
  body: Record<string, any>
  query: Record<string, any>
  params: Record<string, any>
  headers: Record<string, any>
}

export interface IAecoPayload {
  serialNumber: string
  ipAddress: string
  geolocation: IAecoCoords
  requestData: IAecoRequestData
}
