import type { DecodedAeco } from '@shared/domain/Types'
import type { IAeco } from '@common/domain/entities'

export const GET_ALL_AECO_ADVERTISINGS_SERVICE = Symbol(
  'IGetAllAecoAdvertisingsService',
)

export interface IGetAllAecoAdvertisingsService {
  run(currentAeco: DecodedAeco): Promise<IAeco>
}
