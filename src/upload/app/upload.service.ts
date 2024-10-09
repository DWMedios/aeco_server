import { Inject, Injectable } from '@nestjs/common'
import { IS3Service, S3_SERVICES } from '@shared/domain/services/IS3Service'
import { IUploadService } from '../domain/IUploadService'
import { UploadUrlDto } from '../domain/dto/PresignedUploadUrlDto'

@Injectable()
export class UploadService implements IUploadService {
  constructor(
    @Inject(S3_SERVICES)
    private readonly s3Service: IS3Service,
  ) {}
  uploadUrl(uploadUrl: UploadUrlDto): Promise<any> {
    return this.s3Service.generatePresignedUploadUrl(uploadUrl)
  }

  delete(key: string): Promise<any> {
    return this.s3Service.deleteFile(key)
  }
}
