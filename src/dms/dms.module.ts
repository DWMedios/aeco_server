import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from '../common/infra/entities/Company.entity'
import { DMS_REPOSITORY } from '../shared/domain/repositories/IDmsRepository'
import { DmsRepository } from '../shared/infra/repositories/DmsRepository'
import { DmsService } from './app/dms.service'
import { DMS_SERVICE } from './domain/IDmsService'
import { DmsController } from './infra/dms.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [DmsController],
  providers: [
    {
      provide: DMS_SERVICE,
      useClass: DmsService,
    },
    {
      provide: DMS_REPOSITORY,
      useClass: DmsRepository,
    },
  ],
})
export class DmsModule {}
