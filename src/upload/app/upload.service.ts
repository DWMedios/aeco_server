import { Inject, Injectable } from '@nestjs/common'
import type {
  IBaseS3,
  IResponseMessage,
  IResponseUploadUrl,
} from '@shared/domain/S3Type'
import {
  type IS3Service,
  S3_SERVICES,
} from '@shared/domain/services/IS3Service'
import type { IUploadService } from '../domain/IUploadService'
import type { UploadUrlDto } from '../domain/dto/UploadUrlDto'

@Injectable()
export class UploadService implements IUploadService {
  constructor(
    @Inject(S3_SERVICES)
    private readonly s3Service: IS3Service,
  ) {}
  uploadUrl(uploadUrl: UploadUrlDto): Promise<IResponseUploadUrl> {
    return this.s3Service.generatePresignedUploadUrl(uploadUrl)
  }

  delete(data: IBaseS3): Promise<IResponseMessage> {
    return this.s3Service.deleteFile(data)
  }
}
