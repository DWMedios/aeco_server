import type { IAeco } from '@common/domain/entities'
import type { DecodedAeco } from '@shared/domain/Types'

export const GET_ALL_AECO_REWARDS_SERVICE = Symbol('IGetAllAecoRewardsService')

export interface IGetAllAecoRewardsService {
  run(currentAeco: DecodedAeco): Promise<IAeco>
}
