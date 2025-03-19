import { PageMetaDtoParameters } from '../page-meta-parameters'

export class PageMetaDto<T> {
  readonly page: number

  readonly perpage: number

  readonly total: number

  readonly totalpages: number

  readonly records: T[]

  constructor({ pageOptionsDto, total, records }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page
    this.perpage = pageOptionsDto.perpage
    this.total = total
    this.totalpages = Math.ceil(this.total / this.perpage)
    this.records = records
  }
}
