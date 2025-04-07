import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  Aeco,
  Company,
  DailyStats,
  PackagingStats,
  Page,
  Product,
  ProductCapacity,
  ProductStats,
  Promotion,
  Reward,
  Setting,
  Ticket,
  User,
  UserRolePermissions,
} from '@common/infra/entities'
import {
  AECO_REPOSITORY,
  COMPANY_REPOSITORY,
  DASHBOARD_REPOSITORY,
  PAGE_REPOSITORY,
  PRODUCT_CAPACITY_REPOSITORY,
  PRODUCT_REPOSITORY,
  REWARD_REPOSITORY,
  ROLE_REPOSITORY,
  SETTING_REPOSITORY,
  USER_REPOSITORY,
} from './domain/repositories'
import {
  AecoRepository,
  CompanyRepository,
  DashboardRepository,
  PageRepository,
  ProductCapacityRepository,
  ProductRepository,
  RewardRepository,
  RoleRepository,
  SettingsRepository,
  UserRepository,
} from './infra/repositories'
import { TRANSACTION_SERVICE } from './domain/services/transaction-service.interface'
import { TransactionService } from './app/transaction/transaction.service'
import { S3_SERVICES } from './domain/services/IS3Service'
import { S3Service } from './app/files/s3.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Aeco,
      Company,
      Setting,
      Page,
      Promotion,
      Reward,
      Ticket,
      User,
      UserRolePermissions,
      Product,
      ProductCapacity,
      DailyStats,
      ProductStats,
      PackagingStats,
    ]),
  ],
  providers: [
    {
      provide: AECO_REPOSITORY,
      useClass: AecoRepository,
    },
    {
      provide: REWARD_REPOSITORY,
      useClass: RewardRepository,
    },
    {
      provide: SETTING_REPOSITORY,
      useClass: SettingsRepository,
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
      provide: DASHBOARD_REPOSITORY,
      useClass: DashboardRepository,
    },
    {
      provide: S3_SERVICES,
      useClass: S3Service,
    },
  ],
  exports: [
    AECO_REPOSITORY,
    REWARD_REPOSITORY,
    SETTING_REPOSITORY,
    PAGE_REPOSITORY,
    USER_REPOSITORY,
    ROLE_REPOSITORY,
    COMPANY_REPOSITORY,
    PRODUCT_REPOSITORY,
    PRODUCT_CAPACITY_REPOSITORY,
    DASHBOARD_REPOSITORY,
    TRANSACTION_SERVICE,
    S3_SERVICES,
  ],
})
export class SharedModule {}
