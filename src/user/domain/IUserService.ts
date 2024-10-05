import type { IUser } from '@domain-entities'
import type { CreateUserDto } from './dto/UserDto'

export const USER_SERVICE = Symbol('IUserService')

export interface IUserService {
  create(createUser: CreateUserDto): Promise<Partial<IUser>>
}
