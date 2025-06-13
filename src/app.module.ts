import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AecosModule } from '@aecos/aecos.module'
import { AdvertisingsModule } from '@advertisings/advertisings.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthMiddleware } from '@shared/app/middlewares/auth.middleware'
import { AuthModule } from '@auth/auth.module'
import { CommonModule } from '@common/common.module'
import { CompanyModule } from '@company/company.module'
import { DashboardModule } from '@dashboard/dashboard.module'
import { MediaAssetsModule } from '@media-assets/media-assets.module'
import { PagesModule } from './pages/pages.module'
import { ProductsModule } from '@products/products.module'
import { RewardsModule } from '@rewards/rewards.module'
import { SharedModule } from '@shared/shared.module'
import { TicketsModule } from '@tickets/tickets.module'
import { UsersModule } from '@users/users.module'

@Module({
  imports: [
    SharedModule,
    CommonModule,
    UsersModule,
    AuthModule,
    CompanyModule,
    AecosModule,
    RewardsModule,
    PagesModule,
    MediaAssetsModule,
    ProductsModule,
    DashboardModule,
    TicketsModule,
    AdvertisingsModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({
        path: 'auth/login',
        method: RequestMethod.POST,
      })
      .exclude(
        {
          path: 'aecos/initial-setup/:serialNumber',
          method: RequestMethod.GET,
        },
        {
          path: 'aecos/finish-setup/:type/:serialNumber',
          method: RequestMethod.PATCH,
        },
        {
          path: 'aecos/upload-tickets',
          method: RequestMethod.POST,
        },
        {
          path: 'aecos/upload-daily-stats',
          method: RequestMethod.POST,
        },
        {
          path: 'aecos/upload-product-stats',
          method: RequestMethod.POST,
        },
        {
          path: 'aecos/upload-packaging-stats',
          method: RequestMethod.POST,
        },
        {
          path: 'aecos/rewards',
          method: RequestMethod.GET,
        },
        {
          path: 'aecos/advertisings',
          method: RequestMethod.GET,
        },
        {
          path: 'aecos/access-control',
          method: RequestMethod.GET,
        },
      )
      .exclude(
        {
          path: 'products/capacities/after-last',
          method: RequestMethod.GET,
        },
        {
          path: 'products/after-last',
          method: RequestMethod.GET,
        },
      )
      .exclude({
        path: 'media-assets/aecos/download-url/:key',
        method: RequestMethod.GET,
      })
      .forRoutes('*')
  }
}
