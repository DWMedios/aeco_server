import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { CompanyController } from './infra/company.controller'
import { CompanyService } from './app/company.service'
import { COMPANY_SERVICE } from './domain/ICompanyService'
import { COMPANY_REPOSITORY } from '../shared/domain/repositories/ICompanyRepository'
import { CompanyRepository } from '../shared/infra/repositories/CompanyRepository'
import { Company } from '../common/infra/entities/Company.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompanyController],
  providers: [
    {
      provide: COMPANY_SERVICE,
      useClass: CompanyService,
    },
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
  ],
})
export class CompanyModule {}
