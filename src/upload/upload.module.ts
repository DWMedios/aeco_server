import { Module } from '@nestjs/common'
import { S3_SERVICES } from '@shared/domain/services/IS3Service'
import { S3Service } from '@shared/services/s3.service'
import { UploadService } from './app/upload.service'
import { UPLOAD_SERVICE } from './domain/IUploadService'
import { UploadController } from './infra/upload.controller'

@Module({
  controllers: [UploadController],
  providers: [
    {
      provide: UPLOAD_SERVICE,
      useClass: UploadService,
    },
    {
      provide: S3_SERVICES,
      useClass: S3Service,
    },
  ],
})
export class UploadModule {}
