import { Module } from '@nestjs/common'
import { AecosController } from './infra/aecos/aecos.controller'
import { AecosService } from './app/aecos/aecos.service'

@Module({
  controllers: [AecosController],
  providers: [AecosService],
})
export class AecosModule {}
