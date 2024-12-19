import { Inject, Injectable } from '@nestjs/common'
import {
  type IS3Service,
  S3_SERVICES,
} from '@shared/domain/services/IS3Service'

import type { IUploadService } from '../domain/IUploadService'
import type { UploadUrlDto } from '../domain/dto/UploadUrlDto'
import type { BaseUploadDto } from '../domain/dto/BaseUploadDto'

@Injectable()
export class UploadService implements IUploadService {
  constructor(
    @Inject(S3_SERVICES)
    private readonly s3Service: IS3Service,
  ) {}

  async uploadUrl({
    fileName,
    fileType,
    companyId,
  }: UploadUrlDto): Promise<string> {
    //const company = await this.companyRepository.find(companyId)
    //if (!company) throw new BadRequestException('Company not found')
    return this.s3Service.generatePresignedUploadUrl({
      fileType,
      fileName,
      pathFile: `dw/${fileName}`,
    })
  }

  async delete(data: BaseUploadDto): Promise<boolean> {
    await this.s3Service.fileExist(data.key)
    return this.s3Service.deleteFile(data.key)
  }
}
