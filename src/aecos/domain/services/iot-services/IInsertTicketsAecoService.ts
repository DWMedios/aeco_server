import type { DecodedAeco } from '@shared/domain/Types'
import type { RequestCreateTicketsDto } from '../../dto/CreateAecoTickets.dto'

export const INSERT_TICKETS_AECO_SERVICE = Symbol('IInsertTicketsAecoService')

export interface IInsertTicketsAecoService {
  run(
    currentAeco: DecodedAeco,
    request: RequestCreateTicketsDto,
  ): Promise<{ success: boolean }>
}
