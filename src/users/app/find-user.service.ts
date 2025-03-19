import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@shared/domain/repositories'
import type { IUser } from '@common/domain/entities'
import type { IFindUserService } from '@users/domain/services/IFindUserService'

@Injectable()
export class FindUserService implements IFindUserService {
  logger = new Logger(FindUserService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async run(id: number): Promise<Partial<IUser>> {
    const user = await this.userRepository.findById(id)

    if (!user) throw new NotFoundException('El usuario no existe')

    return user
  }
}
