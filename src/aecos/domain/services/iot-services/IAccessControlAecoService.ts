import type { IAecoPayload } from '@aecos/domain/Types'

export const ACCESS_CONTROL_AECO_SERVICE = Symbol('IAccessControlAecoService')

export interface IAccessControlAecoService {
  run(payload: IAecoPayload): Promise<{
    success: boolean
    message: string
  }>
}
