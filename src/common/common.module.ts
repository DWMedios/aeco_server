import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import {
  AppConfig,
  DatabaseConfig,
  JWTConfig,
  PostmarkConfig,
  S3Config,
} from './infra/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, S3Config, JWTConfig, PostmarkConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [ConfigModule, TypeOrmModule],
})
export class CommonModule {}
