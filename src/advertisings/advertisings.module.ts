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
import { FIND_CAMPAIGN_SERVICE } from './domain/services/campaigns/IFindCampaignService'
import { FindCampaignService } from './app/campaigns/find-campaign.service'
import { FIND_ALL_CAMPAIGN_SERVICE } from './domain/services/campaigns/IFindAllCampaignService'
import { FindAllCampaignService } from './app/campaigns/find-all-campaigns.service'
import { DELETE_CAMPAIGN_SERVICE } from './domain/services/campaigns/IDeleteCampaignService'
import { DeleteCampaignService } from './app/campaigns/delete-campaign.service'
import { CREATE_CAMPAIGN_SERVICE } from './domain/services/campaigns/ICreateCampaignService'
import { CreateCampaignService } from './app/campaigns/create-campaign.service'
import { UPDATE_CAMPAIGN_SERVICE } from './domain/services/campaigns/IUpdateCampaignService'
import { UpdateCampaignService } from './app/campaigns/update-campaign.service'
import { GetCampaignController } from './infra/controllers/campaigns/get-campaign.controller'
import { GetAllCampaignsController } from './infra/controllers/campaigns/get-all-campaigns.controller'
import { DeleteCampaignController } from './infra/controllers/campaigns/delete-campaign.controller'
import { PostCampaignController } from './infra/controllers/campaigns/post-campaign.controller'
import { PutCampaignController } from './infra/controllers/campaigns/put-campaign.controller'

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
    {
      provide: FIND_CAMPAIGN_SERVICE,
      useClass: FindCampaignService,
    },
    {
      provide: FIND_ALL_CAMPAIGN_SERVICE,
      useClass: FindAllCampaignService,
    },
    {
      provide: DELETE_CAMPAIGN_SERVICE,
      useClass: DeleteCampaignService,
    },
    {
      provide: CREATE_CAMPAIGN_SERVICE,
      useClass: CreateCampaignService,
    },
    {
      provide: UPDATE_CAMPAIGN_SERVICE,
      useClass: UpdateCampaignService,
    },
  ],
  controllers: [
    GetContractorController,
    GetAllContractorsController,
    PostContractorController,
    DeleteContractorController,
    PutContractorController,
    GetCampaignController,
    GetAllCampaignsController,
    DeleteCampaignController,
    PostCampaignController,
    PutCampaignController,
  ],
  exports: [],
})
export class AdvertisingsModule {}
