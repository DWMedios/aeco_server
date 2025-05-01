import type { IAdvertising } from '@common/domain/entities'
import type { CreateAdvertisingDto } from '../../dto/advertisings/CreateAdvertising.dto'

export const CREATE_ADVERTISING_SERVICE = Symbol('ICreateAdvertisingService')

export interface ICreateAdvertisingService {
  run(payload: CreateAdvertisingDto): Promise<IAdvertising>
}
