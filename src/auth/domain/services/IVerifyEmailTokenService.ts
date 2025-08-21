import type { VerifiiedUserDecodedUser } from '@shared/domain/Types'

export const VERIFY_EMAIL_TOKEN_SERVICE = Symbol('IVerifyEmailTokenService')

export interface IVerifyEmailTokenService {
  run(
    payload: VerifiiedUserDecodedUser,
    password: string,
  ): Promise<{ success: boolean }>
}
