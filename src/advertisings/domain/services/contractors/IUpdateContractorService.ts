import type { IContractor } from '@common/domain/entities'
import type { UpdateContractorDto } from '../../dto/contractors/UpdateContractor.dto'

export const UPDATE_CONTRACTOR_SERVICE = 'UPDATE_CONTRACTOR_SERVICE'

export interface IUpdateContractorService {
  run(id: number, data: UpdateContractorDto): Promise<IContractor>
}
