import type { IAdvertising } from '@common/domain/entities'
import type { UpdateAdvertisingDto } from '../../dto/advertisings/UpdateAdvertising.dto'

export const UPDATE_ADVERTISING_SERVICE = Symbol('IUpdateAdvertisingService')

export interface IUpdateAdvertisingService {
  run(id: number, payload: UpdateAdvertisingDto): Promise<IAdvertising>
}
