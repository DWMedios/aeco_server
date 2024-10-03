import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppConfig, DatabaseConfig } from './common/infra/config'
import { CompanyModule } from './company/company.module'
import { DmsModule } from './dms/dms.module'
import { PagesModule } from './pages/pages.module'
import { RewardCategoryModule } from './reward-category/reward-category.module'
import { RewardsModule } from './rewards/rewards.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
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
    DmsModule,
    PagesModule,
    RewardsModule,
    RewardCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
