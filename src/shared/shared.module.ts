import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { S3Client } from '@aws-sdk/client-s3'
import {
  Advertising,
  Aeco,
  AecoAttempts,
  AecoRequestHistory,
  Campaign,
  Company,
  Contractor,
  DailyStats,
  MediaAsset,
  PackagingStats,
  Page,
  Product,
  ProductCapacity,
  ProductStats,
  Reward,
  Ticket,
  User,
  UserRolePermissions,
} from '@common/infra/entities'
import {
  ADVERTISING_REPOSITORY,
  AECO_ATTEMPTS_REPOSITORY,
  AECO_REPOSITORY,
  AECO_REQUEST_HISTORY_REPOSITORY,
  CAMPAIGN_REPOSITORY,
  COMPANY_REPOSITORY,
  CONTRACTOR_REPOSITORY,
  DASHBOARD_REPOSITORY,
  MEDIA_ASSET_REPOSITORY,
  PAGE_REPOSITORY,
  PRODUCT_CAPACITY_REPOSITORY,
  PRODUCT_REPOSITORY,
  REWARD_REPOSITORY,
  ROLE_REPOSITORY,
  TICKET_REPOSITORY,
  USER_REPOSITORY,
} from './domain/repositories'
import {
  AdvertisingRepository,
  AecoAttemptsRepository,
  AecoRepository,
  AecoRequestHistoryRepository,
  CampaignRepository,
  CompanyRepository,
  ContractorRepository,
  DashboardRepository,
  MediaAssetRepository,
  PageRepository,
  ProductCapacityRepository,
  ProductRepository,
  RewardRepository,
  RoleRepository,
  TicketRepository,
  UserRepository,
} from './infra/repositories'
import { S3_SERVICE } from './domain/services/IS3Service'
import { S3Service } from './app/files/s3.service'
import { TRANSACTION_SERVICE } from './domain/services/transaction-service.interface'
import { TransactionService } from './app/transaction/transaction.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Aeco,
      Advertising,
      Campaign,
      Company,
      Contractor,
      Page,
      Reward,
      Ticket,
      User,
      UserRolePermissions,
      Product,
      ProductCapacity,
      DailyStats,
      ProductStats,
      PackagingStats,
      MediaAsset,
      AecoAttempts,
      AecoRequestHistory,
    ]),
  ],
  providers: [
    {
      provide: AECO_REPOSITORY,
      useClass: AecoRepository,
    },
    {
      provide: AECO_ATTEMPTS_REPOSITORY,
      useClass: AecoAttemptsRepository,
    },
    {
      provide: AECO_REQUEST_HISTORY_REPOSITORY,
      useClass: AecoRequestHistoryRepository,
    },
    {
      provide: REWARD_REPOSITORY,
      useClass: RewardRepository,
    },
    {
      provide: PAGE_REPOSITORY,
      useClass: PageRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
    {
      provide: COMPANY_REPOSITORY,
      useClass: CompanyRepository,
    },
    {
      provide: TRANSACTION_SERVICE,
      useClass: TransactionService,
    },
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepository,
    },
    {
      provide: PRODUCT_CAPACITY_REPOSITORY,
      useClass: ProductCapacityRepository,
    },
    {
      provide: TICKET_REPOSITORY,
      useClass: TicketRepository,
    },
    {
      provide: DASHBOARD_REPOSITORY,
      useClass: DashboardRepository,
    },
    {
      provide: MEDIA_ASSET_REPOSITORY,
      useClass: MediaAssetRepository,
    },
    {
      provide: CONTRACTOR_REPOSITORY,
      useClass: ContractorRepository,
    },
    {
      provide: CAMPAIGN_REPOSITORY,
      useClass: CampaignRepository,
    },
    {
      provide: ADVERTISING_REPOSITORY,
      useClass: AdvertisingRepository,
    },
    {
      provide: S3_SERVICE,
      useClass: S3Service,
    },
    {
      provide: S3Client,
      useFactory: (configService: ConfigService) => {
        return new S3Client({
          region: configService.get<string>('s3.region'),
          credentials: {
            accessKeyId: configService.get<string>('s3.accessKeyId'),
            secretAccessKey: configService.get<string>('s3.secretAccessKey'),
          },
        })
      },
      inject: [ConfigService],
    },
  ],
  exports: [
    AECO_REPOSITORY,
    REWARD_REPOSITORY,
    PAGE_REPOSITORY,
    USER_REPOSITORY,
    ROLE_REPOSITORY,
    COMPANY_REPOSITORY,
    PRODUCT_REPOSITORY,
    PRODUCT_CAPACITY_REPOSITORY,
    DASHBOARD_REPOSITORY,
    TICKET_REPOSITORY,
    MEDIA_ASSET_REPOSITORY,
    CONTRACTOR_REPOSITORY,
    CAMPAIGN_REPOSITORY,
    ADVERTISING_REPOSITORY,
    AECO_ATTEMPTS_REPOSITORY,
    AECO_REQUEST_HISTORY_REPOSITORY,
    TRANSACTION_SERVICE,
    S3_SERVICE,
  ],
})
export class SharedModule {}
