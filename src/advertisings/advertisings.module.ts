import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
// Imports relacionados con advertisings
import { FIND_ADVERTISING_SERVICE } from './domain/services/advertisings/IFindAdvertisingService'
import { FindAdvertisingService } from './app/advertisings/find-advertising.service'
import { FIND_ALL_ADVERTISING_SERVICE } from './domain/services/advertisings/IFindAllAdvertisingService'
import { FindAllAdvertisingService } from './app/advertisings/find-all-advertising.service'
import { CREATE_ADVERTISING_SERVICE } from './domain/services/advertisings/ICreateAdvertisingService'
import { CreateAdvertisingService } from './app/advertisings/create-advertising.service'
import { UPDATE_ADVERTISING_SERVICE } from './domain/services/advertisings/IUpdateAdvertisingService'
import { UpdateAdvertisingService } from './app/advertisings/update-advertising.service'
import { DELETE_ADVERTISING_SERVICE } from './domain/services/advertisings/IDeleteAdvertisingService'
import { DeleteAdvertisingService } from './app/advertisings/delete-advertising.service'
import { GetAllAdvertisingController } from './infra/controllers/advertisings/get-all-advertising.controller'
import { GetAdvertisingController } from './infra/controllers/advertisings/get-advertising.controller'
import { PostAdvertisingController } from './infra/controllers/advertisings/post-advertising.controller'
import { PutAdvertisingController } from './infra/controllers/advertisings/put-advertising.controller'
import { DeleteAdvertisingController } from './infra/controllers/advertisings/delete-advertising.controller'
// Imports relacionados con campaigns
import { FIND_CAMPAIGN_SERVICE } from './domain/services/campaigns/IFindCampaignService'
import { FindCampaignService } from './app/campaigns/find-campaign.service'
import { FIND_ALL_CAMPAIGN_SERVICE } from './domain/services/campaigns/IFindAllCampaignService'
import { FindAllCampaignService } from './app/campaigns/find-all-campaigns.service'
import { CREATE_CAMPAIGN_SERVICE } from './domain/services/campaigns/ICreateCampaignService'
import { CreateCampaignService } from './app/campaigns/create-campaign.service'
import { UPDATE_CAMPAIGN_SERVICE } from './domain/services/campaigns/IUpdateCampaignService'
import { UpdateCampaignService } from './app/campaigns/update-campaign.service'
import { DELETE_CAMPAIGN_SERVICE } from './domain/services/campaigns/IDeleteCampaignService'
import { DeleteCampaignService } from './app/campaigns/delete-campaign.service'
import { FIND_CAMPAIGN_BY_DATE_SERVICE } from './domain/services/campaigns/IFindCampaignByDateService'
import { FindCampaignByDateService } from './app/campaigns/find-campaign-by-date.service'
import { GetAllCampaignsController } from './infra/controllers/campaigns/get-all-campaigns.controller'
import { GetCampaignByDateController } from './infra/controllers/campaigns/get-campaign-by-date.controller'
import { GetCampaignController } from './infra/controllers/campaigns/get-campaign.controller'
import { PostCampaignController } from './infra/controllers/campaigns/post-campaign.controller'
import { PutCampaignController } from './infra/controllers/campaigns/put-campaign.controller'
import { DeleteCampaignController } from './infra/controllers/campaigns/delete-campaign.controller'
// Imports relacionados con contractors
import { FIND_CONTRACTOR_SERVICE } from './domain/services/contractors/IFindContractorService'
import { FindContractorService } from './app/contractors/find-contractor.service'
import { FIND_ALL_CONTRACTOR_SERVICE } from './domain/services/contractors/IFindAllContractorService'
import { FindAllContractorService } from './app/contractors/find-all-contractor.service'
import { CREATE_CONTRACTOR_SERVICE } from './domain/services/contractors/ICreateContractorService'
import { CreateContractorService } from './app/contractors/create-contractor.service'
import { UPDATE_CONTRACTOR_SERVICE } from './domain/services/contractors/IUpdateContractorService'
import { UpdateContractorService } from './app/contractors/update-contractor.service'
import { DELETE_CONTRACTOR_SERVICE } from './domain/services/contractors/IDeleteContractorService'
import { DeleteContractorService } from './app/contractors/delete-contractor.service'
import { GetAllContractorsController } from './infra/controllers/contractors/get-all-contractors.controller'
import { GetContractorController } from './infra/controllers/contractors/get-contractor.controller'
import { PostContractorController } from './infra/controllers/contractors/post-contractor.controller'
import { PutContractorController } from './infra/controllers/contractors/put-contractor.controller'
import { DeleteContractorController } from './infra/controllers/contractors/delete-contractor.controller'

@Module({
  imports: [SharedModule],
  providers: [
    // Servicios de advertising (más genéricos a más específicos)
    {
      provide: FIND_ALL_ADVERTISING_SERVICE,
      useClass: FindAllAdvertisingService,
    },
    {
      provide: FIND_ADVERTISING_SERVICE,
      useClass: FindAdvertisingService,
    },
    {
      provide: CREATE_ADVERTISING_SERVICE,
      useClass: CreateAdvertisingService,
    },
    {
      provide: UPDATE_ADVERTISING_SERVICE,
      useClass: UpdateAdvertisingService,
    },
    {
      provide: DELETE_ADVERTISING_SERVICE,
      useClass: DeleteAdvertisingService,
    },

    // Servicios de campaigns (más genéricos a más específicos)
    {
      provide: FIND_ALL_CAMPAIGN_SERVICE,
      useClass: FindAllCampaignService,
    },
    {
      provide: FIND_CAMPAIGN_BY_DATE_SERVICE,
      useClass: FindCampaignByDateService,
    },
    {
      provide: FIND_CAMPAIGN_SERVICE,
      useClass: FindCampaignService,
    },
    {
      provide: CREATE_CAMPAIGN_SERVICE,
      useClass: CreateCampaignService,
    },
    {
      provide: UPDATE_CAMPAIGN_SERVICE,
      useClass: UpdateCampaignService,
    },
    {
      provide: DELETE_CAMPAIGN_SERVICE,
      useClass: DeleteCampaignService,
    },

    // Servicios de contractors (más genéricos a más específicos)
    {
      provide: FIND_ALL_CONTRACTOR_SERVICE,
      useClass: FindAllContractorService,
    },
    {
      provide: FIND_CONTRACTOR_SERVICE,
      useClass: FindContractorService,
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
      provide: DELETE_CONTRACTOR_SERVICE,
      useClass: DeleteContractorService,
    },
  ],
  controllers: [
    // Rutas específicas de campañas primero
    GetCampaignByDateController, // GET /advertisings/campaigns/by-date
    GetAllCampaignsController, // GET /advertisings/campaigns
    GetCampaignController, // GET /advertisings/campaigns/:id
    PostCampaignController, // POST /advertisings/campaigns
    PutCampaignController, // PUT /advertisings/campaigns/:id
    DeleteCampaignController, // DELETE /advertisings/campaigns/:id

    // Rutas de contractors
    GetAllContractorsController, // GET /advertisings/contractors
    GetContractorController, // GET /advertisings/contractors/:id
    PostContractorController, // POST /advertisings/contractors
    PutContractorController, // PUT /advertisings/contractors/:id
    DeleteContractorController, // DELETE /advertisings/contractors/:id

    // Rutas CRUD básicas de advertising al final (más generales)
    GetAllAdvertisingController, // GET /advertisings
    GetAdvertisingController, // GET /advertisings/:id
    PostAdvertisingController, // POST /advertisings
    PutAdvertisingController, // PUT /advertisings/:id
    DeleteAdvertisingController, // DELETE /advertisings/:id
  ],
  exports: [],
})
export class AdvertisingsModule {}
