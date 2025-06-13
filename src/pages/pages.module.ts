import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { PagesController } from './infra/pages.controller'
import { PAGE_SERVICE } from './domain/IPageService'
import { PagesService } from './app/pages.service'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: PAGE_SERVICE,
      useClass: PagesService,
    },
  ],
  controllers: [PagesController],
})
export class PagesModule {}
