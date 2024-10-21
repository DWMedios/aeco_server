import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import {
  COMPANY_REPOSITORY,
  SETTING_REPOSITORY,
} from '@shared/domain/repositories'
import {
  CompanyRepository,
  SettingsRepository,
} from '@shared/infra/repositories'
import { Company, Setting } from '@common/infra/entities'
import { COMPANY_SERVICE } from './domain/ICompanyService'
import { CompanyController } from './infra/company.controller'
import { CompanyService } from './app/company.service'
import { S3_SERVICES } from '@shared/domain/services/IS3Service'
import { S3Service } from '@shared/services/s3.service'

@Module({
  imports: [TypeOrmModule.forFeature([Company, Setting])],
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
    {
      provide: SETTING_REPOSITORY,
      useClass: SettingsRepository,
    },
    {
      provide: S3_SERVICES,
      useClass: S3Service,
    },
  ],
})
export class CompanyModule {}
