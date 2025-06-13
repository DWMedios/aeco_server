export const DELETE_USER_SERVICE = Symbol('IDeleteUserService')

export interface IDeleteUserService {
  run(id: number): Promise<{ success: boolean }>
}
