import type { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../common/infra/entities/User.entity';
import type { IUser } from '../common/domain/entities/IUser';
import type { CreateUserDto } from './domain/dto/UserDto';
import type { IUserService } from './domain/IUserService';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<IUser>,
  ) {}

  findOneByEmail(email: string): Promise<IUser | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUser: CreateUserDto): Promise<Partial<IUser>> {
    const user = this.userRepository.create(createUser);
    await this.userRepository.save(user);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }
}
