import type { IUser } from '@common/domain/entities'
import type { UpdateUserDto } from '../dto/UpdateUser.dto'

export const UPDATE_USER_SERVICE = Symbol('IUpdateUserService')

export interface IUpdateUserService {
  run(userId: number, request: UpdateUserDto): Promise<Partial<IUser>>
}
