export const RESEND_VERIFY_EMAIL_SERVICE = Symbol('IResendVerifyEmailService')

export interface IResendVerifyEmailService {
  run(userId: number): Promise<{ success: boolean }>
}
