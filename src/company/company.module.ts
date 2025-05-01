import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { CREATE_COMPANY_SERVICE } from './domain/services/ICreateCompanyService'
import { CreateCompanyService } from './app/create-company.service'
import { UPDATE_COMPANY_SERVICE } from './domain/services/IUpdateCompanyService'
import { UpdateCompanyService } from './app/update-company.service'
import { DELETE_COMPANY_SERVICE } from './domain/services/IDeleteCompanyService'
import { DeleteCompanyService } from './app/delete-company.service'
import { PostCompanyController } from './infra/controllers/post-company.controller'
import { PutCompanyController } from './infra/controllers/put-company.controller'
import { DeleteCompanyController } from './infra/controllers/delete-company.controller'
import { FIND_COMPANY_SERVICE } from './domain/services/IFindCompanyService'
import { FindCompanyService } from './app/find-company.service'
import { GetCompanyController } from './infra/controllers/get-company.controller'
import { GetAllCompanyController } from './infra/controllers/get-all-company.controller'
import { FIND_ALL_COMPANY_SERVICE } from './domain/services/IFindAllCompanyService'
import { FindAllCompanyService } from './app/find-all-company.service'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: CREATE_COMPANY_SERVICE,
      useClass: CreateCompanyService,
    },
    {
      provide: UPDATE_COMPANY_SERVICE,
      useClass: UpdateCompanyService,
    },
    {
      provide: DELETE_COMPANY_SERVICE,
      useClass: DeleteCompanyService,
    },
    {
      provide: FIND_COMPANY_SERVICE,
      useClass: FindCompanyService,
    },
    {
      provide: FIND_ALL_COMPANY_SERVICE,
      useClass: FindAllCompanyService,
    },
  ],
  controllers: [
    // Rutas de companies (más genéricas a más específicas)
    GetAllCompanyController, // GET /companies
    GetCompanyController, // GET /companies/:id
    PostCompanyController, // POST /companies
    PutCompanyController, // PUT /companies/:id
    DeleteCompanyController, // DELETE /companies/:id
  ],
})
export class CompanyModule {}
