import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PagesController } from './infra/pages.controller'
import { PagesService } from './app/pages.service'
import { PAGE_SERVICE } from './domain/IPageService'
import { PAGE_REPOSITORY } from '../shared/domain/repositories/IPageRepository'
import { PageRepository } from '../shared/infra/repositories/Pagerepository'
import { Page } from '../common/infra/entities/Page.entity'

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
