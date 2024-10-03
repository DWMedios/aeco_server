import type { IUser } from '../../common/domain/entities/IUser'
import type { CreateUserDto } from './dto/UserDto'

export const USER_SERVICE = Symbol('IUserService')

export interface IUserService {
  create(createUser: CreateUserDto): Promise<Partial<IUser>>
}
