import { Injectable, Inject, Logger, NotFoundException } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  type ICompanyRepository,
} from '@shared/domain/repositories'
import { PageOptionsDto } from '@shared/domain/pagination/dto/page-options.dto'
import { PageMetaDto } from '@shared/domain/pagination/dto/page-meta.dto'
import type { ICompany } from '@common/domain/entities'
import type { CompanyFiltersDto } from '@shared/domain/dto/Filters.dto'
import type { IFindAllCompanyService } from '@company/domain/services/IFindAllCompanyService'

@Injectable()
export class FindAllCompanyService implements IFindAllCompanyService {
  logger = new Logger(FindAllCompanyService.name)

  constructor(
    @Inject(COMPANY_REPOSITORY)
    private readonly companyRepository: ICompanyRepository,
  ) {}

  async run(filters: CompanyFiltersDto): Promise<PageMetaDto<ICompany>> {
    try {
      const [entities, total] = await this.companyRepository.findAll(filters)

      return new PageMetaDto<ICompany>({
        total,
        pageOptionsDto: new PageOptionsDto(filters?.page, filters?.perpage),
        records: entities,
      })
    } catch (error) {
      this.logger.error(error)
      throw new NotFoundException('No se pudo obtener las empresas')
    }
  }
}
