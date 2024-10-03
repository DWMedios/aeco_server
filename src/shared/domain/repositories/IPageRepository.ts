import type { IPage } from '../../../common/domain/entities/IPage'
import type { CreatePageDto } from '../../../pages/domain/dto/PageDto'

export const PAGE_REPOSITORY = Symbol('IPageRepository')

export interface IPageRepository {
  exists(filter: {
    id?: number
    name?: string
    aecoId?: number
  }): Promise<boolean>
  create(createPage: CreatePageDto): Promise<IPage>
}
