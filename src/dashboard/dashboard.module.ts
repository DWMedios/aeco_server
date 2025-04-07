import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { FIND_TOP_PRODUCTS_SERVICE } from './domain/services/IFindTopProductsService'
import { FindTopProductsStatsService } from './app/find-top-products-stats.service'
import { FIND_TOP_PACKAGINGS_SERVICE } from './domain/services/IFindTopPackagingsService'
import { FIND_DAILY_STATS_SERVICE } from './domain/services/IFindDailyStatsService'
import { FindTopPackagingsStatsService } from './app/find-top-packagings-stats.service'
import { FindDailyStatsService } from './app/find-daily-stats.service'
import { GetDailyStatsController } from './infra/controllers/get-daily-stats.controller'
import { GetTopProductsController } from './infra/controllers/get-top-products.controller'
import { GetTopPackagingsController } from './infra/controllers/get-top-packagings.controller'
import { FIND_PACKAGINGS_PER_DAY_SERVICE } from './domain/services/IFindPackagingsPerDayService'
import { FindPackagingsPerDayStatsService } from './app/find-packagings-per-day.stats.service'
import { GetPackagingsPerDayController } from './infra/controllers/get-packagings-per-day.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: FIND_TOP_PRODUCTS_SERVICE,
      useClass: FindTopProductsStatsService,
    },
    {
      provide: FIND_TOP_PACKAGINGS_SERVICE,
      useClass: FindTopPackagingsStatsService,
    },
    {
      provide: FIND_DAILY_STATS_SERVICE,
      useClass: FindDailyStatsService,
    },
    {
      provide: FIND_PACKAGINGS_PER_DAY_SERVICE,
      useClass: FindPackagingsPerDayStatsService,
    },
  ],
  controllers: [
    GetDailyStatsController,
    GetTopProductsController,
    GetTopPackagingsController,
    GetPackagingsPerDayController,
  ],
})
export class DashboardModule {}
