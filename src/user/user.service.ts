import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import type { IUser } from '../common/domain/entities/IUser';
import type { CreateUserDto } from './domain/dto/UserDto';
import type { IUserService } from './domain/IUserService';
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../shared/domain/repositories/IUserRepository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(createUser: CreateUserDto): Promise<Partial<IUser>> {
    const exists = await this.userRepository.exists(createUser.email);

    if (exists) throw new BadRequestException('User already exists');

    return await this.userRepository.create(createUser);
  }
}
