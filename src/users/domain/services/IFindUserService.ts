import type { IUser } from '@common/domain/entities'

export const FIND_USER_SERVICE = Symbol('IFindUserService')

export interface IFindUserService {
  run(id: number): Promise<IUser>
}
