import { Injectable, Inject, BadRequestException } from '@nestjs/common'
import type { IUser } from '../../common/domain/entities/IUser'
import type { CreateUserDto } from '../domain/dto/UserDto'
import type { IUserService } from '../domain/IUserService'
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '../../shared/domain/repositories/IUserRepository'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '../../shared/domain/repositories/ICompanyRepository'

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(createUser: CreateUserDto): Promise<Partial<IUser>> {
    const companyExists = await this.companyRepository.exists({
      id: createUser.companyId,
    })

    if (!companyExists) throw new BadRequestException('Company does not exist')

    const exists = await this.userRepository.exists(createUser.email)

    if (exists) throw new BadRequestException('User already exists')

    return await this.userRepository.create(createUser)
  }
}
