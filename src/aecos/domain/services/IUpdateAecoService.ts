import type { IAeco } from '@common/domain/entities'
import type { UpdateAecoDto } from '../dto/UpdateAecoDto'

export const UPDATE_AECO_SERVICE = Symbol('IUpdateAecoService')

export interface IUpdateAecoService {
  run(id: number, request: UpdateAecoDto): Promise<IAeco>
}
