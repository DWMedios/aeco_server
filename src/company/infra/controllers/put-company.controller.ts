import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common'
import {
  UPDATE_COMPANY_SERVICE,
  type IUpdateCompanyService,
} from '@company/domain/services/IUpdateCompanyService'
import { UpdateCompanyDto } from '@company/domain/dto/UpdateCompany.dto'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@Controller('companies')
export class PutCompanyController {
  logger = new Logger(PutCompanyController.name)

  constructor(
    @Inject(UPDATE_COMPANY_SERVICE)
    private readonly service: IUpdateCompanyService,
  ) {}

  @Put(':id')
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.OK)
  async updateCompany(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCompanyDto,
  ) {
    return await this.service.run(id, payload)
  }
}
