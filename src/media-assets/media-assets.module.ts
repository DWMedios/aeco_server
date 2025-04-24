import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { CREATE_UPLOAD_URL_SERVICE } from './domain/services/ICreateUploadUrlService'
import { CreateUploadUrlService } from './app/create-upload-url.service'
import { PostUploadUrlController } from './infra/controllers/post-upload-url.controller'
import { GET_DOWNLOAD_URL_SERVICE } from './domain/services/IGetDownloadUrlService'
import { GetDownloadUrlService } from './app/get-download-url.service'
import { GetDownloadUrlController } from './infra/controllers/get-download-url.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: CREATE_UPLOAD_URL_SERVICE,
      useClass: CreateUploadUrlService,
    },
    {
      provide: GET_DOWNLOAD_URL_SERVICE,
      useClass: GetDownloadUrlService,
    },
  ],
  controllers: [PostUploadUrlController, GetDownloadUrlController],
})
export class MediaAssetsModule {}
