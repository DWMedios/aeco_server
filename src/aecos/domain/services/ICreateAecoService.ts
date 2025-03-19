import type { IAeco } from '@common/domain/entities'
import type { CreateAecoDto } from '../dto/CreateAeco.dto'

export const CREATE_AECO_SERVICE = Symbol('ICreateAecoService')

export interface ICreateAecoService {
  run(request: CreateAecoDto): Promise<IAeco>
}
