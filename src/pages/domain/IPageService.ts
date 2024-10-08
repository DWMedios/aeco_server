import type { IPage } from '@common/domain/entities'
import type { CreatePageDto } from './dto/PageDto'

export const PAGE_SERVICE = Symbol('IPageService')

export interface IPageService {
  create(createPage: CreatePageDto): Promise<IPage>
}
