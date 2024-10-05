import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import type { IPage } from '@common/domain/entities'
import { PAGE_REPOSITORY, type IPageRepository } from '@shared/domain/repositories'
import type { CreatePageDto } from '../domain/dto/PageDto'
import type { IPageService } from '../domain/IPageService'

@Injectable()
export class PagesService implements IPageService {
  constructor(
    @Inject(PAGE_REPOSITORY)
    private readonly pageRepository: IPageRepository,
  ) {}

  async create(newPage: CreatePageDto): Promise<IPage> {
    const exists = await this.pageRepository.exists({
      name: newPage.name,
      aecoId: newPage.aecoId,
    })

    if (exists) throw new BadRequestException('Page already exists')

    return await this.pageRepository.create(newPage)
  }
}
