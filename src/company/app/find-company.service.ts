import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import type { ICompany } from '@common/domain/entities'
import type { IFindCompanyService } from '@company/domain/services/IFindCompanyService'

@Injectable()
export class FindCompanyService implements IFindCompanyService {
  logger = new Logger(FindCompanyService.name)

  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(id: number): Promise<ICompany> {
    const company = await this.companyRepository.findById(id)

    if (!company) throw new NotFoundException('La empresa no existe')

    return company
  }
}
