import type { DecodedUser } from '@shared/domain/Types'

export const JWT_SERVICE = Symbol('IJwtService')

export interface IJwtService {
  sign(payload: Partial<DecodedUser>): string
  verify(token: string): Promise<DecodedUser>
}
