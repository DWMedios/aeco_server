import type { ForgotPasswordDecodedUser } from '@shared/domain/Types'

export const VERIFY_RESET_PASSWORD_TOKEN_SERVICE = Symbol(
  'IVerifyResetPasswordTokenService',
)

export interface IVerifyResetPasswordTokenService {
  run(userToReset: ForgotPasswordDecodedUser): Promise<boolean>
}
