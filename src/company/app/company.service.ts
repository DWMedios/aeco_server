import type { ICompany } from '@common/domain/entities'
import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import type { CreateCompanyDto } from '../domain/dto/CompanyDto'
import type { ICompanyService } from '../domain/ICompanyService'

@Injectable()
export class CompanyService implements ICompanyService {
  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async create(newCompany: CreateCompanyDto): Promise<ICompany> {
    const exists = await this.companyRepository.exists({
      name: newCompany.name,
    })

    if (exists) throw new BadRequestException('Company already exists')

    return await this.companyRepository.create(newCompany)
  }
}
