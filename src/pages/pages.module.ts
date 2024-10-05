import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PAGE_REPOSITORY } from '@shared/domain/repositories'
import { PageRepository } from '@shared/infra/repositories'
import { Page } from '@common/infra/entities'
import { PagesController } from './infra/pages.controller'
import { PAGE_SERVICE } from './domain/IPageService'
import { PagesService } from './app/pages.service'

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  controllers: [PagesController],
  providers: [
    {
      provide: PAGE_SERVICE,
      useClass: PagesService,
    },
    {
      provide: PAGE_REPOSITORY,
      useClass: PageRepository,
    },
  ],
})
export class PagesModule {}
