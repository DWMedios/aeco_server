import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
// Core AECO
import { FIND_ALL_AECO_SERVICE } from './domain/services/IFindAllAecoService'
import { FindAllAecoService } from './app/find-all-aeco.service'
import { GetAllAecoController } from './infra/controllers/get-all-aeco.controller'
import { FIND_AECO_SERVICE } from './domain/services/IFindAecoService'
import { FindAecoService } from './app/find-aeco.service'
import { GetAecoController } from './infra/controllers/get-aeco.controller'
import { CREATE_AECO_SERVICE } from './domain/services/ICreateAecoService'
import { CreateAecoService } from './app/create-aeco.service'
import { PostAecoController } from './infra/controllers/post-aeco.controller'
import { UPDATE_AECO_SERVICE } from './domain/services/IUpdateAecoService'
import { UpdateAecoService } from './app/update-aeco.service'
import { PutAecoController } from './infra/controllers/put-aeco.controller'
import { DELETE_AECO_SERVICE } from './domain/services/IDeleteAecoService'
import { DeleteAecoService } from './app/delete-aeco.service'
import { DeleteAecoController } from './infra/controllers/delete-aeco.controller'
import { AECO_SERVICE } from './domain/services/IAecoService'
import { AecoService } from './app/aeco.service'
import { AecosController } from './infra/controllers/aecos.controller'
// IOT Services
import { GET_ALL_AECO_REWARDS_SERVICE } from './domain/services/iot-services/IGetAllAecoRewardsService'
import { GetAllAecoRewardsService } from './app/iot-services/get-all-aeco-rewards.service'
import { GetAllAecoRewardsController } from './infra/controllers/iot-controllers/get-all-aeco-rewards.controller'
import { GET_ALL_AECO_ADVERTISINGS_SERVICE } from './domain/services/iot-services/IGetAllAecoAdvertisingsService'
import { GetAllAecoAdvertisingsService } from './app/iot-services/get-all-aeco-advertisings.service'
import { GetAllAecoAdvertisingsController } from './infra/controllers/iot-controllers/get-all-aeco-advertisings.controller'
import { INSERT_DAILY_STATS_AECO_SERVICE } from './domain/services/iot-services/IInsertDailyStatsAecoService'
import { InsertDailyStatsAecoService } from './app/iot-services/insert-daily-stats-aeco.service'
import { PostInsertDailyStatsController } from './infra/controllers/iot-controllers/post-insert-daily-stats.controller'
import { INSERT_PACKAGING_STATS_AECO_SERVICE } from './domain/services/iot-services/IInsertPackagingStatsAecoService'
import { InsertPackagingStatsAecoService } from './app/iot-services/insert-packaging-stats-aeco.service'
import { PostInsertPackagingStatsController } from './infra/controllers/iot-controllers/post-insert-packaging-stats.controller'
import { INSERT_PRODUCT_STATS_AECO_SERVICE } from './domain/services/iot-services/IInsertProductStatsAecoService'
import { InsertProductStatsAecoService } from './app/iot-services/insert-product-stats-aeco.service'
import { PostInsertProductStatsController } from './infra/controllers/iot-controllers/post-insert-product-stats.controller'
import { INSERT_TICKETS_AECO_SERVICE } from './domain/services/iot-services/IInsertTicketsAecoService'
import { InsertTicketsAecoService } from './app/iot-services/insert-tickets-aeco.service'
import { PostInsertTicketsController } from './infra/controllers/iot-controllers/post-insert-tickets.controller'
import { ACCESS_CONTROL_AECO_SERVICE } from './domain/services/iot-services/IAccessControlAecoService'
import { AccessControlAecoService } from './app/iot-services/access-control-aeco.service'
import { GetAccessControlAecoController } from './infra/controllers/iot-controllers/get-access-control-aeco.controller'

@Module({
  imports: [SharedModule],
  providers: [
    // Providers principales de AECO
    {
      provide: FIND_ALL_AECO_SERVICE,
      useClass: FindAllAecoService,
    },
    {
      provide: FIND_AECO_SERVICE,
      useClass: FindAecoService,
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
    {
      provide: AECO_SERVICE,
      useClass: AecoService,
    },
    // Providers para servicios IOT
    {
      provide: ACCESS_CONTROL_AECO_SERVICE,
      useClass: AccessControlAecoService,
    },
    {
      provide: GET_ALL_AECO_REWARDS_SERVICE,
      useClass: GetAllAecoRewardsService,
    },
    {
      provide: GET_ALL_AECO_ADVERTISINGS_SERVICE,
      useClass: GetAllAecoAdvertisingsService,
    },
    {
      provide: INSERT_DAILY_STATS_AECO_SERVICE,
      useClass: InsertDailyStatsAecoService,
    },
    {
      provide: INSERT_PACKAGING_STATS_AECO_SERVICE,
      useClass: InsertPackagingStatsAecoService,
    },
    {
      provide: INSERT_PRODUCT_STATS_AECO_SERVICE,
      useClass: InsertProductStatsAecoService,
    },
    {
      provide: INSERT_TICKETS_AECO_SERVICE,
      useClass: InsertTicketsAecoService,
    },
  ],
  controllers: [
    // Rutas especiales y específicas primero
    GetAccessControlAecoController, // GET /aecos/access-control
    GetAllAecoRewardsController, // GET /aecos/rewards
    GetAllAecoAdvertisingsController, // GET /aecos/advertisings
    AecosController, // Contiene rutas específicas como initial-setup y finish-setup

    // Rutas relacionadas con IOT (ordenadas por entidad)
    PostInsertDailyStatsController, // POST /aecos/upload-daily-stats
    PostInsertPackagingStatsController, // POST /aecos/upload-packaging-stats
    PostInsertProductStatsController, // POST /aecos/upload-product-stats
    PostInsertTicketsController, // POST /aecos/upload-tickets

    // Rutas CRUD básicas de aecos (más generales)
    GetAllAecoController, // GET /aecos
    GetAecoController, // GET /aecos/:id
    PostAecoController, // POST /aecos
    PutAecoController, // PUT /aecos/:id
    DeleteAecoController, // DELETE /aecos/:id
  ],
})
export class AecosModule {}
