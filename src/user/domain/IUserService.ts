import type { IUser } from '../../common/domain/entities/IUser';
import type { CreateUserDto } from './dto/UserDto';

export const USER_SERVICE = Symbol('IUserService');

export interface IUserService {
  findOneByEmail(email: string): Promise<IUser | undefined>;
  create(createUser: CreateUserDto): Promise<Partial<IUser>>;
}
