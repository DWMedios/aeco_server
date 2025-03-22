import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  FIND_COMPANY_SERVICE,
  type IFindCompanyService,
} from '@company/domain/services/IFindCompanyService'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@Controller('companies')
export class GetCompanyController {
  logger = new Logger(GetCompanyController.name)

  constructor(
    @Inject(FIND_COMPANY_SERVICE)
    private readonly service: IFindCompanyService,
  ) {}

  @Get(':id')
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  async getOneCompany(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
