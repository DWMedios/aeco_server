import type { IUser } from '@common/domain/entities'
import type { DecodedUser } from '@shared/domain/Types'
import type { UserFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'

export const FIND_ALL_USER_SERVICE = Symbol('IFindAllUserService')

export interface IFindAllUserService {
  run(
    currentUser: DecodedUser,
    filters: UserFiltersDto,
  ): Promise<PageMetaDto<IUser>>
}
