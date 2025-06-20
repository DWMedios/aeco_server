import {
  Injectable,
  Inject,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  USER_REPOSITORY,
  type IUserRepository,
} from '@shared/domain/repositories'
import { UserRoleEntiyEnum } from '@common/domain/enums/UserRole.enum'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { DecodedUser } from '@shared/domain/Types'
import type { IUser } from '@common/domain/entities'
import type { UserFiltersDto } from '@users/domain/dto/Filters.dto'
import type { IFindAllUserService } from '@users/domain/services/IFindAllUserService'

@Injectable()
export class FindAllUserService implements IFindAllUserService {
  logger = new Logger(FindAllUserService.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async run(
    currentUser: DecodedUser,
    filters: UserFiltersDto,
  ): Promise<PageMetaDto<IUser>> {
    const companyIds: number[] = []
    const roleType = currentUser.roleType

    if (roleType !== UserRoleEntiyEnum.SUPER_ADMIN) {
      const userCompany = currentUser.company
      companyIds.push(userCompany.id)
    }
    try {
      const [entities, total] = await this.userRepository.findAll(
        filters,
        companyIds,
      )

      return new PageMetaDto<IUser>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new InternalServerErrorException('No se pudo obtener los usuarios')
    }
  }
}
