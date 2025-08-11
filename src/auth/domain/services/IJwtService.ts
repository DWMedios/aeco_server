import type {
  DecodedUser,
  ForgotPasswordDecodedUser,
  VerifiiedUserDecodedUser,
} from '@shared/domain/Types'

export const JWT_SERVICE = Symbol('IJwtService')

export interface IJwtService {
  sign(payload: Partial<DecodedUser>): string
  signResetPassword(payload: { email: string; sub: string }): string
  signVerifiedEmail(payload: {
    email: string
    sub: string
    companyName: string
  }): string
  verify(token: string): Promise<DecodedUser>
  verifyResetPassword(token: string): Promise<ForgotPasswordDecodedUser>
  verifyEmail(token: string): Promise<VerifiiedUserDecodedUser>
}
