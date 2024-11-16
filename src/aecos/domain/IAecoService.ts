import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from './dto/AecoDto'
import type { UpdateAecoDto } from './dto/UpdateAecoDto'
import type { FinishSetupDto } from './dto/FinishSetupDto'

export const AECO_SERVICE = Symbol('IAecoService')

export interface IAecoService {
  find(id: number): Promise<Partial<IAeco>>
  create(aeco: CreateAecoDto): Promise<IAeco>
  update(aeco: UpdateAecoDto, id: number): Promise<IAeco>
  getInitialSetup(serialNumber: string): Promise<IAeco | null>
  getUpdates(serialNumber: string): Promise<IAeco | null>
  finishSetup(data: FinishSetupDto): any
  delete(id: number): Promise<boolean>
}
