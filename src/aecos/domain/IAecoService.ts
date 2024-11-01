import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from './dto/AecoDto'
import type { UpdateAecoDto } from './dto/UpdateAecoDto'

export const AECO_SERVICE = Symbol('IAecoService')

export interface IAecoService {
  find(id: number): Promise<Partial<IAeco>>
  create(aeco: CreateAecoDto): Promise<Partial<IAeco>>
  update(aeco: UpdateAecoDto, id: number): Promise<Partial<IAeco>>
  getInitialSetup(serialNumber: string): Promise<IAeco | null>
  delete(id: number): Promise<boolean>
}
