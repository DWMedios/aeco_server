import { IPage } from 'src/common/domain/entities/IPage'
import { CreatePageDto } from './dto/PageDto'

export const PAGE_SERVICE = Symbol('IPageService')

export interface IPageService {
  create(createPage: CreatePageDto): Promise<IPage>
}
