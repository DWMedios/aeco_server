import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { IPage } from '../../../common/domain/entities/IPage';
import { Page } from '../../../common/infra/entities/Page.entity';
import type { CreatePageDto } from '../../../pages/domain/dto/PageDto';
import type { IPageRepository } from '../../domain/repositories/IPageRepository';

export class PageRepository implements IPageRepository {
  constructor(
    @InjectRepository(Page)
    private readonly PageRepository: Repository<IPage>,
  ) {}

  async exists(filter: { id?: number; name?: string }): Promise<boolean> {
    if (!filter) return false;

    const whereClause: { id?: number; name?: string } = {};

    if (filter.id) whereClause.id = filter.id;
    if (filter.name) whereClause.name = filter.name;

    return this.PageRepository.exists({ where: whereClause });
  }

  async create(createPage: CreatePageDto): Promise<IPage> {
    const qb = await this.PageRepository.createQueryBuilder('page')
      .insert()
      .values(createPage)
      .returning('*')
      .execute();
    return qb.raw[0];
  }
}
