import type { DecodedAeco } from '@shared/domain/Types'
import type { RequestProductStatsDto } from '../dto/CreateAecoStats.dto'

export const INSERT_PRODUCT_STATS_AECO_SERVICE = Symbol(
  'IInsertProductStatsAecoService',
)

export interface IInsertProductStatsAecoService {
  run(
    currentAeco: DecodedAeco,
    request: RequestProductStatsDto,
  ): Promise<{ success: boolean }>
}
