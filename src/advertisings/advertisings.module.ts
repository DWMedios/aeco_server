import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { FIND_CONTRACTOR_SERVICE } from './domain/services/contractors/IFindContractorService'
import { FindContractorService } from './app/contractors/find-contractor.service'
import { FIND_ALL_CONTRACTOR_SERVICE } from './domain/services/contractors/IFindAllContractorService'
import { FindAllContractorService } from './app/contractors/find-all-contractor.service'
import { DELETE_CONTRACTOR_SERVICE } from './domain/services/contractors/IDeleteContractorService'
import { DeleteContractorService } from './app/contractors/delete-contractor.service'
import { CREATE_CONTRACTOR_SERVICE } from './domain/services/contractors/ICreateContractorService'
import { CreateContractorService } from './app/contractors/create-contractor.service'
import { UPDATE_CONTRACTOR_SERVICE } from './domain/services/contractors/IUpdateContractorService'
import { UpdateContractorService } from './app/contractors/update-contractor.service'
import { GetContractorController } from './infra/controllers/contractors/get-contractor.controller'
import { GetAllContractorsController } from './infra/controllers/contractors/get-all-contractors.controller'
import { PostContractorController } from './infra/controllers/contractors/post-contractor.controller'
import { DeleteContractorController } from './infra/controllers/contractors/delete-contractor.controller'
import { PutContractorController } from './infra/controllers/contractors/put-contractor.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: FIND_CONTRACTOR_SERVICE,
      useClass: FindContractorService,
    },
    {
      provide: FIND_ALL_CONTRACTOR_SERVICE,
      useClass: FindAllContractorService,
    },
    {
      provide: DELETE_CONTRACTOR_SERVICE,
      useClass: DeleteContractorService,
    },
    {
      provide: CREATE_CONTRACTOR_SERVICE,
      useClass: CreateContractorService,
    },
    {
      provide: UPDATE_CONTRACTOR_SERVICE,
      useClass: UpdateContractorService,
    },
  ],
  controllers: [
    GetContractorController,
    GetAllContractorsController,
    PostContractorController,
    DeleteContractorController,
    PutContractorController,
  ],
  exports: [],
})
export class AdvertisingsModule {}
