import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateCompanyDto } from '../domain/dto/CompanyDto';
import {
  COMPANY_SERVICE,
  type ICompanyService,
} from '../domain/ICompanyService';

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(COMPANY_SERVICE)
    private readonly companyService: ICompanyService,
  ) {}

  @Post()
  async create(@Body() createCompany: CreateCompanyDto) {
    return await this.companyService.create(createCompany);
  }
}
