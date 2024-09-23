import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IPage } from 'src/common/domain/entities/IPage';
import {
  IPageRepository,
  PAGE_REPOSITORY,
} from '../../shared/domain/repositories/IPageRepository';
import { CreatePageDto } from '../domain/dto/PageDto';

@Injectable()
export class PagesService {
  constructor(
    @Inject(PAGE_REPOSITORY)
    private readonly pageRepository: IPageRepository,
  ) {}

  async create(newPage: CreatePageDto): Promise<IPage> {
    const exists = await this.pageRepository.exists({
      name: newPage.name,
      aecoId: newPage.aecoId,
    });

    if (exists) throw new BadRequestException('Page already exists');

    return await this.pageRepository.create(newPage);
  }
}
