import { Inject, Injectable } from '@nestjs/common'
import {
  type IS3Service,
  S3_SERVICES,
} from '@shared/domain/services/IS3Service'
import type { IUploadService } from '../domain/IUploadService'
import type { UploadUrlDto } from '../domain/dto/UploadUrlDto'
import { BaseUploadDto } from '../domain/dto/BaseUploadDto'

@Injectable()
export class UploadService implements IUploadService {
  constructor(
    @Inject(S3_SERVICES)
    private readonly s3Service: IS3Service,
  ) {}

  uploadUrl(uploadUrl: UploadUrlDto): Promise<string> {
    return this.s3Service.generatePresignedUploadUrl(uploadUrl)
  }

  async delete(data: BaseUploadDto): Promise<boolean> {
    await this.s3Service.fileExist(data.key)
    return this.s3Service.deleteFile(data.key)
  }
}
