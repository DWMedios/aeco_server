import { Page } from '@common/infra/entities'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PAGE_REPOSITORY } from '@shared/domain/repositories'
import { PageRepository } from '@shared/infra/repositories'
import { PagesService } from './app/pages.service'
import { PAGE_SERVICE } from './domain/IPageService'
import { PagesController } from './infra/pages.controller'

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
