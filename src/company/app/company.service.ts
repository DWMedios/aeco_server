import type { ICompany } from '@common/domain/entities'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import type { CreateCompanyDto } from '../domain/dto/CompanyDto'
import type { ICompanyService } from '../domain/ICompanyService'
import { UpdateCompanyDto } from '../domain/dto/UpdateCompanyDto'

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async find(id: number): Promise<Partial<ICompany>> {
    const exists = await this.companyRepository.exists({
      id: id,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.find(id)
  }

  async create(newCompany: CreateCompanyDto): Promise<ICompany> {
    const exists = await this.companyRepository.exists({
      name: newCompany.name,
    })

    if (exists) throw new BadRequestException('Company already exists')

    return await this.companyRepository.create(newCompany)
  }

  async update(
    company: UpdateCompanyDto,
    id: number,
  ): Promise<Partial<ICompany>> {
    const exists = await this.companyRepository.exists({
      id: id,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.update(company, id)
  }

  async delete(id: number): Promise<any> {
    const exists = await this.companyRepository.exists({
      id: id,
    })
    if (!exists) throw new BadRequestException('Company not found')

    return await this.companyRepository.delete(id)
  }
}
