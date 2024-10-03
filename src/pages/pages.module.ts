import { Module } from '@nestjs/common'
import { PagesController } from './infra/pages.controller'
import { PagesService } from './app/pages.service'

@Module({
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
