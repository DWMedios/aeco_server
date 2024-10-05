import type { IUser } from '@domain-entities'
import type { CreateUserDto } from '../../../user/domain/dto/UserDto'

export const USER_REPOSITORY = Symbol('IUserRepository')

export interface IUserRepository {
  exists(email: string): Promise<boolean>
  findByEmail(email: string): Promise<IUser | undefined>
  create(createUser: CreateUserDto): Promise<Partial<IUser>>
}
