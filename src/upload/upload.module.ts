import { Module } from '@nestjs/common'
import { SharedModule } from '@shared/shared.module'
import { UploadService } from './app/upload.service'
import { UPLOAD_SERVICE } from './domain/IUploadService'
import { UploadController } from './infra/upload.controller'

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: UPLOAD_SERVICE,
      useClass: UploadService,
    },
  ],
  controllers: [UploadController],
})
export class UploadModule {}
