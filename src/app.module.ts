import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { AuthMiddleware } from '@shared/app/middlewares/auth.middleware'
import { AuthModule } from '@auth/auth.module'
import { UsersModule } from '@users/users.module'
import { CommonModule } from '@common/common.module'
import { SharedModule } from '@shared/shared.module'
import { RewardsModule } from '@rewards/rewards.module'
import { UploadModule } from '@upload/upload.module'
import { AecosModule } from './aecos/aecos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompanyModule } from './company/company.module'
import { PagesModule } from './pages/pages.module'
import { RewardCategoryModule } from './reward-category/reward-category.module'

@Module({
  imports: [
    AuthModule,
    CommonModule,
    SharedModule,
    UsersModule,
    CompanyModule,
    PagesModule,
    RewardsModule,
    RewardCategoryModule,
    AecosModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
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
          path: 'aecos/needs-update/:serialNumber',
          method: RequestMethod.GET,
        },
        {
          path: 'aecos/finish-setup/:type/:serialNumber',
          method: RequestMethod.PATCH,
        },
      )
      .forRoutes('*')
  }
}
