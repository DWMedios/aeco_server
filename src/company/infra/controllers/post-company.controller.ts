import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common'
import {
  CREATE_COMPANY_SERVICE,
  type ICreateCompanyService,
} from '@company/domain/services/ICreateCompanyService'
import { CreateCompanyDto } from '@company/domain/dto/CreateCompany.dto'
import { CompaniesRoleGuard } from '../guards/companies-role.guard'

@Controller('companies')
export class PostCompanyController {
  logger = new Logger(PostCompanyController.name)

  constructor(
    @Inject(CREATE_COMPANY_SERVICE)
    private readonly service: ICreateCompanyService,
  ) {}

  @Post()
  @UseGuards(CompaniesRoleGuard)
  @HttpCode(HttpStatus.CREATED)
  async createCompany(@Body() payload: CreateCompanyDto) {
    return await this.service.run(payload)
  }
}
