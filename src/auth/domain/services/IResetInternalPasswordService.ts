export const RESET_INTERNAL_PASSWORD_SERVICE = Symbol(
  'IResetInternalPasswordService',
)

export interface IResetInternalPasswordService {
  run(userid: number, password: string): Promise<{ success: boolean }>
}
