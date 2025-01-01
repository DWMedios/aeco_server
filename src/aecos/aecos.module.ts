import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AECO_REPOSITORY } from '@shared/domain/repositories'
import { AecoRepository } from '@shared/infra/repositories'
import { Aeco } from '@common/infra/entities'
import { AECO_SERVICE } from './domain/IAecoService'
import { AecosController } from './infra/aecos.controller'
import { AecosService } from './app/aecos.service'
import { S3_SERVICES } from '@shared/domain/services/IS3Service'
import { S3Service } from '@shared/services/s3.service'

@Module({
  imports: [TypeOrmModule.forFeature([Aeco])],
  controllers: [AecosController],
  providers: [
    {
      provide: AECO_SERVICE,
      useClass: AecosService,
    },
    {
      provide: AECO_REPOSITORY,
      useClass: AecoRepository,
    },
    {
      provide: S3_SERVICES,
      useClass: S3Service,
    },
  ],
})
export class AecosModule {}
