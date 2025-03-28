import type { AecoStatusEnum } from '@common/domain/enums/AecoStatus.enum'

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
