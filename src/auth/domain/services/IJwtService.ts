import type { DecodedUser } from '@shared/domain/Types'

export const JWT_SERVICE = Symbol('IJwtService')

export interface IJwtService {
  sign(payload: Partial<DecodedUser>): string
  signResetPassword(payload: { email: string; sub: number }): string
  verify(token: string): Promise<DecodedUser>
  verifyResetPassword(token: string): Promise<any>
}
