import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../../../common/infra/entities/User.entity'
import type { IUser } from '../../../common/domain/entities/IUser'
import type { CreateUserDto } from '../../../user/domain/dto/UserDto'
import type { IUserRepository } from '../../domain/repositories/IUserRepository'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<IUser>,
  ) {}

  async exists(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne()
  }

  async create(createUser: CreateUserDto): Promise<Partial<IUser>> {
    const { companyId, ...newUser } = createUser
    const user = this.userRepository.create(newUser)
    user.companies = [{ id: companyId } as any]
    await this.userRepository.save(user)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user
    return result
  }
}
