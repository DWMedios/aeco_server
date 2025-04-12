import type { DecodedAeco } from '@shared/domain/Types'
import type { CreateDailyStatsDto } from '../dto/CreateAecoStats.dto'

export const INSERT_DAILY_STATS_AECO_SERVICE = Symbol(
  'IInsertDailyStatsAecoService',
)

export interface IInsertDailyStatsAecoService {
  run(
    currentAeco: DecodedAeco,
    request: CreateDailyStatsDto,
  ): Promise<{ success: boolean }>
}
