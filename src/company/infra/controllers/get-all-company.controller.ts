import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Query,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_ALL_COMPANY_SERVICE,
  type IFindAllCompanyService,
} from '@company/domain/services/IFindAllCompanyService'
import { CompanyFiltersDto } from '@shared/domain/dto/Filters.dto'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@Controller('companies')
export class GetAllCompanyController {
  logger = new Logger(GetAllCompanyController.name)

  constructor(
    @Inject(FIND_ALL_COMPANY_SERVICE)
    private readonly service: IFindAllCompanyService,
  ) {}

  @Get()
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  async getAllCompanies(@Query() filters: CompanyFiltersDto) {
    return await this.service.run(filters)
  }
}
