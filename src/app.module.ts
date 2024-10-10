import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AecosModule } from './aecos/aecos.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfig, DatabaseConfig, S3Config } from './common/infra/config'
import { CompanyModule } from './company/company.module'
import { PagesModule } from './pages/pages.module'
import { RewardCategoryModule } from './reward-category/reward-category.module'
import { RewardsModule } from './rewards/rewards.module'
import { UserModule } from './user/user.module'
import { UploadModule } from './upload/upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, S3Config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
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
export class AppModule {}
