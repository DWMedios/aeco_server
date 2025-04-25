import type { IUser } from '@common/domain/entities'
import type { CreateUserDto } from '../dto/CreateUser.dto'

export const CREATE_USER_SERVICE = Symbol('ICreateUserService')

export interface ICreateUserService {
  run(request: CreateUserDto): Promise<IUser>
}
