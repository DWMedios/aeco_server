import type { IAdvertising } from '@common/domain/entities'

export const FIND_ADVERTISING_SERVICE = Symbol('IFindAdvertisingService')

export interface IFindAdvertisingService {
  run(id: number): Promise<IAdvertising>
}
