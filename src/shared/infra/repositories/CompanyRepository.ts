import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from '@common/infra/entities'
import type { ICompany } from '@common/domain/entities'
import type { ICompanyRepository } from '@shared/domain/repositories'
import type { CreateCompanyDto } from '../../../company/domain/dto/CompanyDto'
import type { UpdateCompanyDto } from 'src/company/domain/dto/UpdateCompanyDto'

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

  async find(id: number): Promise<ICompany> {
    return this.repository.findOne({
      where: { id: id },
      relations: ['settings'],
    })
  }

  async create(company: CreateCompanyDto): Promise<ICompany> {
    const qb = await this.repository
      .createQueryBuilder('company')
      .insert()
      .values(company as ICompany)
      .returning('*')
      .execute()
    return qb.raw[0]
  }

  async createWithSettings(company: any): Promise<ICompany> {
    const newCompany = this.repository.create(company as ICompany)
    return this.repository.save(newCompany)
  }

  async update(company: UpdateCompanyDto, id: number): Promise<ICompany> {
    const qb = await this.repository
      .createQueryBuilder('company')
      .update()
      .set(company as ICompany)
      .where('id = :id', { id: id })
      .returning('*')
      .execute()

    return qb.raw[0]
  }

  async updateWithSettings(
    exists: ICompany,
    company: UpdateCompanyDto,
  ): Promise<ICompany> {
    const updatedCompany = this.repository.merge(exists, company as ICompany)
    return this.repository.save(updatedCompany)
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository
      .createQueryBuilder('company')
      .delete()
      .where('id = :id', { id: id })
      .execute()

    return result.affected !== 0
  }
}
