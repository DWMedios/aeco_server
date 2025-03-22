import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common'
import {
  DELETE_COMPANY_SERVICE,
  type IDeleteCompanyService,
} from '@company/domain/services/IDeleteCompanyService'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@Controller('companies')
export class DeleteCompanyController {
  logger = new Logger(DeleteCompanyController.name)

  constructor(
    @Inject(DELETE_COMPANY_SERVICE)
    private readonly service: IDeleteCompanyService,
  ) {}

  @Delete(':id')
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  async deleteCompany(@Param('id', ParseIntPipe) id: number) {
    return await this.service.run(id)
  }
}
