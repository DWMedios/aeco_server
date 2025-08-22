import type { ForgotPasswordDecodedUser } from '@shared/domain/Types'

export const RESET_EXTERNAL_PASSWORD_SERVICE = Symbol(
  'IResetExternalPasswordService',
)

export interface IResetExternalPasswordService {
  run(
    payload: ForgotPasswordDecodedUser,
    password: string,
  ): Promise<{ success: boolean }>
}
