import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from 'src/aecos/domain/dto/AecoDto'
import type { UpdateAecoDto } from 'src/aecos/domain/dto/UpdateAecoDto'

export const AECO_REPOSITORY = Symbol('IAecoRepository')

export interface IAecoRepository {
  exists(filter: {
    id?: number
    serialNumber?: string
    name?: string
  }): Promise<boolean>
  find(id: number): Promise<IAeco>
  create(company: CreateAecoDto): Promise<IAeco>
  update(exists: IAeco, company: UpdateAecoDto): Promise<IAeco>
  initialSetup(serialNumber: string): Promise<IAeco | null>
  delete(id: number): Promise<boolean>
}
