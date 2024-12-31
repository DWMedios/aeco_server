import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateCompanyDto } from '../domain/dto/CompanyDto'
import {
  COMPANY_SERVICE,
  type ICompanyService,
} from '../domain/ICompanyService'
import { UpdateCompanyDto } from '../domain/dto/UpdateCompanyDto'

@Controller('company')
export class CompanyController {
  constructor(
    @Inject(COMPANY_SERVICE)
    private readonly companyService: ICompanyService,
  ) {}

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.find(id)
  }

  @Post()
  async create(@Body() createCompany: CreateCompanyDto) {
    return await this.companyService.createWithSettings(createCompany)
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() company: UpdateCompanyDto,
  ) {
    return await this.companyService.updateWithSettings(company, id)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.companyService.delete(id)
  }

  @Get('image/:id')
  async getImage(@Param('id') id: number) {
    return await this.companyService.getImage(id)
  }
}
