import type { DecodedAeco } from '@shared/domain/Types'
import type { RequestPackagingStatsDto } from '../../dto/CreateAecoStats.dto'

export const INSERT_PACKAGING_STATS_AECO_SERVICE = Symbol(
  'IInsertPackagingStatsAecoService',
)

export interface IInsertPackagingStatsAecoService {
  run(
    currentAeco: DecodedAeco,
    request: RequestPackagingStatsDto,
  ): Promise<{ success: boolean }>
}
