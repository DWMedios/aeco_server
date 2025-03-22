export const RESET_PASSWORD_SERVICE = Symbol('IResetPasswordService')

export interface IResetPasswordService {
  run(userid: number, password: string): Promise<{ success: boolean }>
}
