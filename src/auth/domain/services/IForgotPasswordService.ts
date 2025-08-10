import type { ForgotPasswordDto } from '../dto/forgot-password.dto'

export const FORGOT_PASSWORD_SERVICE = Symbol('IForgotPasswordService')

export interface IForgotPasswordService {
  run(data: ForgotPasswordDto): Promise<{ success: boolean }>
}
