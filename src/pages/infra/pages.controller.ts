import { Body, Controller, Inject, Post } from '@nestjs/common'
import { IPageService, PAGE_SERVICE } from '../domain/IPageService'
import type { CreatePageDto } from '../domain/dto/PageDto'

@Controller('pages')
export class PagesController {
  constructor(
    @Inject(PAGE_SERVICE)
    private readonly pageService: IPageService,
  ) {}

  @Post()
  async create(@Body() createPage: CreatePageDto) {
    return await this.pageService.create(createPage)
  }
}
