import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { GET_DOWNLOAD_URL_SERVICE } from './domain/services/IGetDownloadUrlService'
import { GetDownloadUrlService } from './app/get-download-url.service'
import { GetDownloadUrlController } from './infra/controllers/get-download-url.controller'
import { CREATE_UPLOAD_URL_SERVICE } from './domain/services/ICreateUploadUrlService'
import { CreateUploadUrlService } from './app/create-upload-url.service'
import { PostUploadUrlController } from './infra/controllers/post-upload-url.controller'
import { DELETE_FILE_SERVICE } from './domain/services/IDeleteFileService'
import { DeleteFileService } from './app/delete-file.service'
import { DeleteFileController } from './infra/controllers/delete-file.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: GET_DOWNLOAD_URL_SERVICE,
      useClass: GetDownloadUrlService,
    },
    {
      provide: CREATE_UPLOAD_URL_SERVICE,
      useClass: CreateUploadUrlService,
    },
    {
      provide: DELETE_FILE_SERVICE,
      useClass: DeleteFileService,
    },
  ],
  controllers: [
    // Rutas de media-assets (ordenadas de más generales a más específicas)
    GetDownloadUrlController, // GET /media-assets/download-url/:key
    PostUploadUrlController, // POST /media-assets/upload-url
    DeleteFileController, // DELETE /media-assets/:key
  ],
})
export class MediaAssetsModule {}
