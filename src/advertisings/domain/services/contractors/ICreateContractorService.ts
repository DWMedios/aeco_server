import type { IContractor } from '@common/domain/entities'
import type { CreateContractorDto } from '@advertisings/domain/dto/contractors/CreateContractor.dto'

export const CREATE_CONTRACTOR_SERVICE = Symbol('ICreateContractorService')

export interface ICreateContractorService {
  run(data: CreateContractorDto): Promise<IContractor>
}
