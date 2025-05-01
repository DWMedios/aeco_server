import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { CREATE_REWARD_SERVICE } from './domain/services/ICreateRewardService'
import { CreateRewardService } from './app/create-reward.service'
import { DELETE_REWARD_SERVICE } from './domain/services/IDeleteRewardService'
import { DeleteRewardService } from './app/delete-reward.service'
import { FIND_ALL_REWARD_SERVICE } from './domain/services/IFindAllRewardService'
import { FindAllRewardService } from './app/find-all-reward.service'
import { UPDATE_REWARD_SERVICE } from './domain/services/IUpdateRewardService'
import { UpdateRewardService } from './app/update-reward.service'
import { FIND_REWARD_SERVICE } from './domain/services/IFindRewardService'
import { FindRewardService } from './app/find-reward.service'
import { DeleteRewardController } from './infra/controllers/delete-reward.controller'
import { GetAllRewardController } from './infra/controllers/get-all-reward.controller'
import { GetRewardController } from './infra/controllers/get-reward.controller'
import { PostRewardController } from './infra/controllers/post-reward.controller'
import { PutRewardController } from './infra/controllers/put-reward.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: CREATE_REWARD_SERVICE,
      useClass: CreateRewardService,
    },
    {
      provide: DELETE_REWARD_SERVICE,
      useClass: DeleteRewardService,
    },
    {
      provide: FIND_ALL_REWARD_SERVICE,
      useClass: FindAllRewardService,
    },
    {
      provide: FIND_REWARD_SERVICE,
      useClass: FindRewardService,
    },
    {
      provide: UPDATE_REWARD_SERVICE,
      useClass: UpdateRewardService,
    },
  ],
  controllers: [
    // Rutas de rewards (más genéricas a más específicas)
    GetAllRewardController, // GET /rewards
    GetRewardController, // GET /rewards/:id
    PostRewardController, // POST /rewards
    PutRewardController, // PUT /rewards/:id
    DeleteRewardController, // DELETE /rewards/:id
  ],
})
export class RewardsModule {}
