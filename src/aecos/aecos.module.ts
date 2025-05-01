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
import { INSERT_TICKETS_AECO_SERVICE } from './domain/services/iot-services/IInsertTicketsAecoService'
import { InsertTicketsAecoService } from './app/iot-services/insert-tickets-aeco.service'
import { PostInsertTicketsController } from './infra/controllers/iot-controllers/post-insert-tickets.controller'
import { InsertDailyStatsAecoService } from './app/iot-services/insert-daily-stats-aeco.service'
import { INSERT_DAILY_STATS_AECO_SERVICE } from './domain/services/iot-services/IInsertDailyStatsAecoService'
import { InsertProductStatsAecoService } from './app/iot-services/insert-product-stats-aeco.service'
import { INSERT_PRODUCT_STATS_AECO_SERVICE } from './domain/services/iot-services/IInsertProductStatsAecoService'
import { INSERT_PACKAGING_STATS_AECO_SERVICE } from './domain/services/iot-services/IInsertPackagingStatsAecoService'
import { InsertPackagingStatsAecoService } from './app/iot-services/insert-packaging-stats-aeco.service'
import { PostInsertDailyStatsController } from './infra/controllers/iot-controllers/post-insert-daily-stats.controller'
import { PostInsertProductStatsController } from './infra/controllers/iot-controllers/post-insert-product-stats.controller'
import { PostInsertPackagingStatsController } from './infra/controllers/iot-controllers/post-insert-packaging-stats.controller'
import { GET_ALL_AECO_REWARDS_SERVICE } from './domain/services/iot-services/IGetAllAecoRewardsService'
import { GetAllAecoRewardsService } from './app/iot-services/get-all-aeco-rewards.service'
import { GetAllAecoRewardsController } from './infra/controllers/iot-controllers/get-all-aeco-rewards.controller'

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
    {
      provide: INSERT_TICKETS_AECO_SERVICE,
      useClass: InsertTicketsAecoService,
    },
    {
      provide: INSERT_DAILY_STATS_AECO_SERVICE,
      useClass: InsertDailyStatsAecoService,
    },
    {
      provide: INSERT_PRODUCT_STATS_AECO_SERVICE,
      useClass: InsertProductStatsAecoService,
    },
    {
      provide: INSERT_PACKAGING_STATS_AECO_SERVICE,
      useClass: InsertPackagingStatsAecoService,
    },
    {
      provide: GET_ALL_AECO_REWARDS_SERVICE,
      useClass: GetAllAecoRewardsService,
    },
  ],
  controllers: [
    // Rutas de aecos (más genéricas a más específicas)
    GetAllAecoController, // GET /aecos
    GetAecoController, // GET /aecos/:id
    PostAecoController, // POST /aecos
    PutAecoController, // PUT /aecos/:id
    DeleteAecoController, // DELETE /aecos/:id

    // Rutas especiales de aecos
    AecosController, // Contiene rutas específicas como initial-setup y finish-setup

    // Rutas relacionadas con IOT (ordenadas por entidad)
    GetAllAecoRewardsController, // GET /aecos/rewards
    PostInsertDailyStatsController, // POST /aecos/upload-daily-stats
    PostInsertPackagingStatsController, // POST /aecos/upload-packaging-stats
    PostInsertProductStatsController, // POST /aecos/upload-product-stats
    PostInsertTicketsController, // POST /aecos/upload-tickets
  ],
})
export class AecosModule {}
