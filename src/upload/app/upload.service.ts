import { Inject, Injectable } from '@nestjs/common'
import { S3_SERVICE, type IS3Service } from '@shared/domain/services/IS3Service'
import type { IUploadService } from '../domain/IUploadService'
import type { UploadUrlDto } from '../domain/dto/UploadUrlDto'
import type { BaseUploadDto } from '../domain/dto/BaseUploadDto'

@Injectable()
export class UploadService implements IUploadService {
  constructor(
    @Inject(S3_SERVICE)
    private readonly s3Service: IS3Service,
  ) {}

  async uploadUrl({ fileName, fileType }: UploadUrlDto): Promise<string> {
    //const company = await this.companyRepository.find(companyId)
    //if (!company) throw new BadRequestException('Company not found')
    return ''
  }

  async delete(data: BaseUploadDto): Promise<boolean> {
    await this.s3Service.fileExist(data.key)
    return this.s3Service.deleteFile(data.key)
  }
}
