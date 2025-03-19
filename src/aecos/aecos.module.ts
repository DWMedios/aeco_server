import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { AecosController } from './infra/controllers/aecos.controller'
import { CREATE_AECO_SERVICE } from './domain/services/ICreateAecoService'
import { CreateAecoService } from './app/create-aeco.service'
import { UPDATE_AECO_SERVICE } from './domain/services/IUpdateAecoService'
import { UpdateAecoService } from './app/update-aeco.service'
import { DELETE_AECO_SERVICE } from './domain/services/IDeleteAecoService'
import { DeleteAecoService } from './app/delete-aeco.service'
import { AECO_SERVICE } from './domain/services/IAecoService'
import { AecoService } from './app/aeco.service'
import { FIND_AECO_SERVICE } from './domain/services/IFindAecoService'
import { FindAecoService } from './app/find-aeco.service'
import { FIND_ALL_AECO_SERVICE } from './domain/services/IFindAllAecoService'
import { FindAllAecoService } from './app/find-all-aeco.service'
import { GetAecoController } from './infra/controllers/get-aeco.controller'
import { GetAllAecoController } from './infra/controllers/get-all-aeco.controller'
import { PostAecoController } from './infra/controllers/post-aeco.controller'
import { PutAecoController } from './infra/controllers/put-aeco.controller'
import { DeleteAecoController } from './infra/controllers/delete-aeco.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: AECO_SERVICE,
      useClass: AecoService,
    },
    {
      provide: FIND_AECO_SERVICE,
      useClass: FindAecoService,
    },
    {
      provide: FIND_ALL_AECO_SERVICE,
      useClass: FindAllAecoService,
    },
    {
      provide: CREATE_AECO_SERVICE,
      useClass: CreateAecoService,
    },
    {
      provide: UPDATE_AECO_SERVICE,
      useClass: UpdateAecoService,
    },
    {
      provide: DELETE_AECO_SERVICE,
      useClass: DeleteAecoService,
    },
  ],
  controllers: [
    GetAecoController,
    GetAllAecoController,
    PostAecoController,
    PutAecoController,
    DeleteAecoController,
    AecosController,
  ],
})
export class AecosModule {}
