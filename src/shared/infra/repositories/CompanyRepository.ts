import type { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../../../common/infra/entities/Company.entity';
import type { ICompany } from '../../../common/domain/entities/ICompany';
import type { CreateCompanyDto } from '../../../company/domain/dto/CompanyDto';
import type { ICompanyRepository } from '../../domain/repositories/ICompanyRepository';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<ICompany>,
  ) {}

  async exists(filter: { id?: number; name?: string }): Promise<boolean> {
    if (!filter) return false;

    const whereClause: { id?: number; name?: string } = {};

    if (filter.id) whereClause.id = filter.id;
    if (filter.name) whereClause.name = filter.name;

    return this.companyRepository.exists({ where: whereClause });
  }

  async create(createCompany: CreateCompanyDto): Promise<ICompany> {
    const qb = await this.companyRepository
      .createQueryBuilder('company')
      .insert()
      .values(createCompany)
      .returning('*')
      .execute();
    return qb.raw[0];
  }
}
