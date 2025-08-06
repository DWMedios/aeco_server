import type {
  DecodedUser,
  ForgotPasswordDecodedUser,
} from '@shared/domain/Types'

export const JWT_SERVICE = Symbol('IJwtService')

export interface IJwtService {
  sign(payload: Partial<DecodedUser>): string
  signResetPassword(payload: { email: string; sub: string }): string
  verify(token: string): Promise<DecodedUser>
  verifyResetPassword(token: string): Promise<ForgotPasswordDecodedUser>
}
