import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from '@infra-entities'
import type { ICompany } from '@domain-entities'
import type { ICompanyRepository } from '@domain-repositories'
import type { CreateCompanyDto } from '../../../company/domain/dto/CompanyDto'

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repository: Repository<ICompany>,
  ) {}

  async exists(filter: { id?: number; name?: string }): Promise<boolean> {
    if (!filter) return false

    const whereClause: { id?: number; name?: string } = {}

    if (filter.id) whereClause.id = filter.id
    if (filter.name) whereClause.name = filter.name

    return this.repository.exists({ where: whereClause })
  }

  async create(createCompany: CreateCompanyDto): Promise<ICompany> {
    const qb = await this.repository
      .createQueryBuilder('company')
      .insert()
      .values(createCompany)
      .returning('*')
      .execute()
    return qb.raw[0]
  }
}
