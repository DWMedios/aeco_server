import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { AECO_REPOSITORY } from '@shared/domain/repositories'
import { AecoRepository } from '@shared/infra/repositories'
import { Aeco } from '@common/infra/entities'
import { AECO_SERVICE } from './domain/IAecoService'
import { AecosController } from './infra/aecos.controller'
import { AecosService } from './app/aecos.service'

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
  ],
})
export class AecosModule {}
